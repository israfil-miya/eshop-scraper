// types.ts

export interface ReplaceMap {
  [key: string]: string;
}

export interface DOM {
  window: {
    document: Document;
  };
}

export type KeyValPair = [string | string[], string];

export interface SiteProps {
  site: string;
  selectors: {
    priceSelector: string;
    nameSelector: string;
  };
  uri: string;
  link: string;
}

export interface WebProps {
  get(
    domain: string,
  ):
    | { site: string; selector: { price: string[]; name: string[] } }
    | undefined;
}

export type WebsitesPropsType = Map<
  string,
  { site: string; selector: { price: string[]; name: string[] } }
>;

export interface EshopScraperOptions {
  timeout?: number;
  webprops?: WebProps | WebProps;
  replaceobj?: ReplaceMap;
  currencymap?: Map<string, string>;
  headersarr?: { [key: string]: string }[]; // Ensure this is an array of header objects
}

export interface GetDataResult {
  price?: number;
  currency?: string;
  name?: string;
  site?: string;
  link?: string;
  IsError?: boolean;
  ErrorMsg?: string;
}
