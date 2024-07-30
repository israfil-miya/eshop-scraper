import axios from 'axios';
import { JSDOM } from 'jsdom';

import {
  titleCase,
  setHeader,
  separator,
  setCurrency,
  $,
  siteProps,
  mergeMaps,
  isErrorProps,
} from './utils';

import randomHeaders from './configs/headers';
import replaceString from './configs/replace_string';
import websitesProps from './configs/websites_props';
import currencyLookupMapping from './configs/currency_lookup';

import {
  ReplaceMap,
  WebsitesProps,
  EshopScraperOptions,
  ResultData,
} from './types';

const abortController: AbortController = new AbortController();

export class EshopScraper {
  readonly _timeoutAmount: number;
  readonly _timeout: NodeJS.Timeout;
  readonly _webProps: WebsitesProps;
  readonly _replaceObj: ReplaceMap;
  readonly _currencyMap: Map<string[], string>;
  readonly _headers: { [key: string]: string }[];

  // Constructor
  constructor({
    timeout = 10,
    webProps,
    replaceObj,
    currencyMap,
    headersArr = randomHeaders,
  }: EshopScraperOptions = {}) {
    this._timeoutAmount = timeout * 1000;
    this._timeout = setTimeout(() => {
      abortController.abort();
    }, this._timeoutAmount);

    this._webProps =
      webProps instanceof Map
        ? mergeMaps(websitesProps, webProps)
        : websitesProps;

    this._replaceObj = replaceObj
      ? { ...replaceString, ...replaceObj }
      : replaceString;

    this._currencyMap =
      currencyMap instanceof Map
        ? mergeMaps(currencyLookupMapping, currencyMap)
        : currencyLookupMapping;

    this._headers = headersArr;
  }

  async getData(link: string): Promise<ResultData> {
    try {
      if (typeof link !== 'string') {
        throw new Error('Link is not provided in the first parameter');
      }

      if (link === '') {
        throw new Error('Link is empty');
      }

      const propsData = siteProps(link, this._webProps);

      if (isErrorProps(propsData)) {
        throw new Error(propsData.errorMsg);
      }

      const { data } = await axios.get(propsData.link, {
        signal: abortController.signal,
        headers: setHeader(this._headers), // Apply random headers
        timeout: this._timeoutAmount,
      });
      clearTimeout(this._timeout);

      let dom;
      try {
        dom = new JSDOM(data);
      } catch (domError) {
        if (
          domError instanceof Error &&
          domError.message.includes('Could not parse CSS stylesheet')
        ) {
          console.warn('Warning: Could not parse CSS stylesheet');
        } else {
          throw domError; // Re-throw if it's a different error
        }
      }

      const priceElement = propsData.selectors.priceSelector
        ? $(dom, propsData.selectors.priceSelector)
        : null;

      const raw_string = priceElement
        ? priceElement.textContent!.toLowerCase().trim()
        : 'Unable to get the product price';

      const { price, currency: currencyRaw } =
        separator(raw_string, this._replaceObj) ?? {};

      const currency =
        setCurrency(currencyRaw, this._currencyMap)?.toUpperCase() ||
        'Unable to get the currency';

      const nameElement = $(dom, propsData.selectors.nameSelector);

      const name = nameElement
        ? titleCase(nameElement.textContent!.trim())
        : 'Unable to get the product name';

      return {
        isError: false,
        price,
        currency,
        name,
        site: propsData.site,
        link,
      };
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        return {
          isError: true,
          errorMsg: `Request failed with status code ${err.response?.status}: ${err.response?.statusText}`,
        };
      } else if (err instanceof Error) {
        if (err.message === 'canceled') err.message = 'Request took too long';
        return {
          isError: true,
          errorMsg: err.message,
        };
      }
      return {
        isError: true,
        errorMsg: 'An unknown error occurred',
      };
    }
  }
}
