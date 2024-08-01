import axios, { AxiosError } from 'axios';
import { JSDOM } from 'jsdom';

// Change to require if axios-retry import is problematic
const axiosRetry = require('axios-retry').default;

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

// for update and delete methods
import { Error as Result } from './types';

export class EshopScraper {
  readonly _timeoutAmount: number;
  readonly _webProps: WebsitesProps;
  readonly _replaceObj: ReplaceMap;
  readonly _currencyMap: Map<string[], string>;
  readonly _headers: { [key: string]: string }[];
  readonly _retry: number;

  // Constructor
  constructor({
    timeout = 10,
    webProps,
    replaceObj,
    currencyMap,
    headersArr = randomHeaders,
    retry = 2,
  }: EshopScraperOptions = {}) {
    this._timeoutAmount = timeout * 1000;

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
    this._retry = retry;

    // Apply axios-retry to axios instance
    axiosRetry(axios, {
      retries: this._retry,
      retryCondition: (error: AxiosError) => {
        if (axiosRetry.isNetworkOrIdempotentRequestError(error)) {
          return true; // Retry on network or idempotent request errors
        }

        // Handle specific status codes
        if (error.response) {
          const status = error.response.status;
          if (status === 403) {
            return false; // Do not retry on forbidden errors
          }
          if (status === 429 || status >= 500) {
            return true; // Retry on rate limiting (429) or server errors (500+)
          }
        }

        return false; // Default: Do not retry for other cases
      },
      retryDelay: retryCount => {
        return retryCount * 1000; // Exponential backoff
      },
    });
  }

  // Method to get data
  async getData(link: string, timeoutAmount?: number): Promise<ResultData> {
    const abortController = new AbortController();
    timeoutAmount =
      typeof timeoutAmount === 'number'
        ? timeoutAmount * 1000
        : this._timeoutAmount;

    const timeout = setTimeout(() => {
      abortController.abort();
    }, timeoutAmount);

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
        headers: setHeader(this._headers),
        timeout: this._timeoutAmount,
      });

      clearTimeout(timeout);

      let dom: JSDOM = new JSDOM(data);

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
      clearTimeout(timeout);
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

  // Methods for _currencyMap
  updateCurrencyMap = (
    key: string[][] | string[],
    value: string[] | string,
  ): Result => {
    try {
      const newKey = Array.isArray(key) && Array.isArray(key[0]) ? key : [key];
      const newValue = Array.isArray(value) ? value : [value];

      if (newKey.length !== newValue.length) {
        throw new Error('Keys and values arrays must have the same length.');
      }

      newKey.forEach((k, index) => {
        const mapKeys = Array.from(this._currencyMap.keys());
        const existingKey = mapKeys.find(
          existingKeys =>
            existingKeys.length === k.length &&
            existingKeys.every((val, i) => val === k[i]),
        );
        if (existingKey) {
          this._currencyMap.set(existingKey, newValue[index] || '');
        } else {
          console.log(`Key ${k} does not exist in the currency map.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg: 'Error updating currency map: ' + (error as Error).message,
      };
    }
  };

  deleteCurrencyMap = (key: string[][] | string[]): Result => {
    try {
      const keysToDelete =
        Array.isArray(key) && Array.isArray(key[0]) ? key : [key];

      keysToDelete.forEach(k => {
        const mapKeys = Array.from(this._currencyMap.keys());
        const keyToDelete = mapKeys.find(
          existingKeys =>
            existingKeys.length === k.length &&
            existingKeys.every((val, i) => val === k[i]),
        );

        if (keyToDelete) {
          this._currencyMap.delete(keyToDelete);
        } else {
          console.log(`Key ${k} does not exist in the currency map.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg:
          'Error deleting from currency map: ' + (error as Error).message,
      };
    }
  };

  // Methods for _replaceObj
  updateReplaceObj = (
    key: string | string[],
    value: string | string[],
  ): Result => {
    try {
      const newKey = Array.isArray(key) ? key : [key];
      const newValue = Array.isArray(value) ? value : [value];

      if (newKey.length !== newValue.length) {
        throw new Error('Keys and values arrays must have the same length.');
      }

      newKey.forEach((k, index) => {
        if (this._replaceObj.hasOwnProperty(k)) {
          this._replaceObj[k] = newValue[index] || '';
        } else {
          console.log(`Key "${k}" does not exist in the replace object.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg: 'Error updating replace object: ' + (error as Error).message,
      };
    }
  };

  deleteReplaceObj = (key: string | string[]): Result => {
    try {
      const keysToDelete = Array.isArray(key) ? key : [key];

      keysToDelete.forEach(k => {
        if (this._replaceObj.hasOwnProperty(k)) {
          delete this._replaceObj[k];
        } else {
          console.log(`Key "${k}" does not exist in the replace object.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg:
          'Error deleting from replace object: ' + (error as Error).message,
      };
    }
  };

  // Methods for _webProps
  updateWebProps = (
    site: string | string[],
    properties:
      | { site: string; selector: { price: string[]; name: string[] } }
      | { site: string; selector: { price: string[]; name: string[] } }[],
  ): Result => {
    try {
      const newSite = Array.isArray(site) ? site : [site];
      const newProperties = Array.isArray(properties)
        ? properties
        : [properties];

      if (newSite.length !== newProperties.length) {
        throw new Error(
          'Sites and properties arrays must have the same length.',
        );
      }

      newSite.forEach((s, index) => {
        if (this._webProps.has(s)) {
          this._webProps.set(s, newProperties[index]);
        } else {
          console.log(`Site "${s}" does not exist in web properties.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg: 'Error updating web properties: ' + (error as Error).message,
      };
    }
  };

  deleteWebProps = (site: string | string[]): Result => {
    try {
      const sitesToDelete = Array.isArray(site) ? site : [site];

      sitesToDelete.forEach(s => {
        if (this._webProps.has(s)) {
          this._webProps.delete(s);
        } else {
          console.log(`Site "${s}" does not exist in web properties.`);
        }
      });

      return { isError: false };
    } catch (error) {
      return {
        isError: true,
        errorMsg:
          'Error deleting from web properties: ' + (error as Error).message,
      };
    }
  };
}
