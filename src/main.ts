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
  convertMapToArrayKeys,
} from './utils';

import randomHeaders from './configs/headers';
import replaceString from './configs/replace_string';
import websitesProps from './configs/websites_props';
import currencyLookupMapping from './configs/currency_lookup';

import {
  ReplaceMap,
  WebProps,
  EshopScraperOptions,
  GetDataResult,
} from './types';

const abortController: AbortController = new AbortController();

export class EshopScraper {
  private _timeoutAmount: number;
  private _timeout: NodeJS.Timeout;
  private _webprops: WebProps;
  private _replaceobj: ReplaceMap;
  private _currencymap: Map<string[], string>;
  private _headers: { [key: string]: string }[];

  // Constructor
  constructor({
    timeout = 10,
    webprops,
    replaceobj,
    currencymap,
    headersarr = randomHeaders, // Default to randomHeaders if none provided
  }: EshopScraperOptions = {}) {
    this._timeoutAmount = timeout * 1000;
    this._timeout = setTimeout(() => {
      abortController.abort();
    }, this._timeoutAmount);

    this._webprops =
      webprops instanceof Map
        ? mergeMaps(websitesProps, webprops)
        : websitesProps;

    this._replaceobj = replaceobj
      ? { ...replaceString, ...replaceobj }
      : replaceString;

    // Convert currencymap to Map<string[], string> if it's Map<string, string>
    const processedCurrencymap =
      currencymap instanceof Map
        ? (currencymap as Map<string, string>).size > 0 &&
          typeof Array.from(currencymap.keys())[0] === 'string'
          ? convertMapToArrayKeys(currencymap as Map<string, string>)
          : currencymap
        : currencyLookupMapping;

    // Ensure currencymap is of type Map<string[], string>
    this._currencymap = mergeMaps<string[], string>(
      currencyLookupMapping,
      processedCurrencymap as Map<string[], string>,
    );

    this._headers = headersarr; // This should now be an array of header objects
  }

  async getData(link: string): Promise<GetDataResult> {
    try {
      if (typeof link !== 'string')
        throw new Error('Link is not provided in the first parameter');

      const propsData = siteProps(link, this._webprops);

      if (isErrorProps(propsData)) {
        throw new Error(propsData.ErrorMsg);
      }

      const { data } = await axios.get(propsData.link, {
        signal: abortController.signal,
        headers: setHeader(this._headers), // Apply random headers
        timeout: this._timeoutAmount,
      });
      clearTimeout(this._timeout);

      const dom = new JSDOM(data);
      const priceElement = propsData.selectors.priceSelector
        ? $(dom, propsData.selectors.priceSelector)
        : null;
      if (!priceElement) throw new Error('Unable to get the product price');

      const raw_string = priceElement.textContent!.toLowerCase().trim();

      const { price, currency: currencyRaw } =
        separator(raw_string, this._replaceobj) ?? {};
      const currency = setCurrency(
        currencyRaw,
        this._currencymap,
      )?.toUpperCase();

      const nameElement = $(dom, propsData.selectors.nameSelector);
      if (!nameElement) throw new Error('Unable to get the product name');
      const name = titleCase(nameElement.textContent!.trim());

      return {
        price,
        currency,
        name,
        site: propsData.site,
        link,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'canceled') err.message = 'Request took too long';
        return {
          IsError: true,
          ErrorMsg: err.message,
        };
      }
      return {
        IsError: true,
        ErrorMsg: 'An unknown error occurred',
      };
    }
  }
}
