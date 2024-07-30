import { ReplaceMap, DOM, SiteProps, WebsitesProps } from './types';

import { AxiosRequestHeaders } from 'axios';

declare global {
  interface String {
    allReplace(obj: ReplaceMap): string;
  }
}

String.prototype.allReplace = function (obj: ReplaceMap): string {
  let retStr = this as string;
  for (const x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
  }
  return retStr;
};

const currencySeparated = (arr: (string | number)[]): string => {
  for (const item of arr) {
    if (item !== undefined && isNaN(parseFloat(item.toString()))) {
      return item.toString();
    }
  }
  return ''; // Return an empty string if no currency is found
};

const priceSeparated = (arr: (string | number)[]): number => {
  for (const item of arr) {
    if (item !== undefined && !isNaN(parseFloat(item.toString()))) {
      return parseFloat(item.toString());
    }
  }
  return 0; // Return 0 if no price is found
};

export const $ = (dom: DOM, selector: string): HTMLElement | null =>
  dom.window.document.querySelector(selector);

export const setHeader = (
  headersArr: { [key: string]: string }[],
): AxiosRequestHeaders => {
  const randomIndex = Math.floor(Math.random() * headersArr.length);
  return headersArr[randomIndex]; // Return a single headers object
};
export const titleCase = (str: string): string =>
  str.replace(
    /\p{L}+('\p{L}+)?/gu,
    txt => txt.charAt(0).toUpperCase() + txt.slice(1),
  );

export const setCurrency = (
  txt: string,
  currencymap: Map<string[], string>,
): string | undefined => {
  // Iterate over the map entries to find a matching currency code
  for (const [keys, value] of currencymap.entries()) {
    if (keys.includes(txt)) {
      return value; // Return the corresponding currency if found
    }
  }
  return undefined; // Return undefined if no match is found
};

export const mergeMaps = <K extends string[] | string, V>(
  map1: Map<K, V>,
  map2: Map<K, V>,
): Map<K, V> => {
  const mapCopy = new Map(map1); // Start with map1 entries

  // Add or update entries from map2
  map2.forEach((value, key) => {
    mapCopy.set(key, value);
  });

  return mapCopy;
};

export const siteProps = (
  link: string,
  webprops: WebsitesProps,
): SiteProps | { isError: boolean; errorMsg: string } => {
  try {
    const webdomain = link.replace('www.', '').split('/')[2].trim();
    const prop = webprops.get(webdomain);
    if (!prop) throw new Error('No site found');

    const siteName = prop.site;
    const selectorsList = prop.selector;
    const priceSelector = selectorsList.price.join(', ');
    const nameSelector = selectorsList.name.join(', ');
    const siteUri = webdomain;
    const fullPathLink = link;
    return {
      site: siteName,
      selectors: {
        priceSelector,
        nameSelector,
      },
      uri: siteUri,
      link: fullPathLink,
    };
  } catch (err: Error | unknown) {
    return {
      isError: true,
      errorMsg: (err as Error).message,
    };
  }
};

export const separator = (
  str: string,
  replaceString: ReplaceMap,
): { currency: string; price: number } => {
  const rawArray =
    str
      .trim()
      .replace(/\s+/g, '')
      .allReplace(replaceString)
      .match(/[\d\.]+|\D+/g) || [];
  const currency = currencySeparated(rawArray);
  const price = priceSeparated(rawArray);
  return {
    currency,
    price,
  };
};

export const isErrorProps = (
  data: SiteProps | { isError: boolean; errorMsg: string },
): data is { isError: boolean; errorMsg: string } => {
  return (data as { isError: boolean; errorMsg: string }).isError !== undefined;
};

export const convertMapToArrayKeys = (
  map: Map<string, string>,
): Map<string[], string> => {
  const result = new Map<string[], string>();
  map.forEach((value, key) => {
    result.set([key], value); // Wrap key in an array
  });
  return result;
};
