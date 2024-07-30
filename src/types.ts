// types.ts

export interface ReplaceMap {
  [key: string]: string;
}

export interface DOM {
  window: {
    document: Document;
  };
}

export interface SiteProps {
  site: string;
  selectors: {
    priceSelector: string;
    nameSelector: string;
  };
  uri: string;
  link: string;
}

export type WebsitesProps = Map<
  string,
  { site: string; selector: { price: string[]; name: string[] } }
>;

export interface EshopScraperOptions {
  timeout?: number;
  webProps?: WebsitesProps;
  replaceObj?: ReplaceMap;
  currencyMap?: Map<string, string>;
  headersArr?: { [key: string]: string }[]; // Ensure this is an array of header objects
}

export interface ResultData {
  site?: string;
  name?: string;
  price?: number;
  currency?: string;
  link?: string;
  isError: boolean;
  errorMsg?: string;
}

export interface Data {
  isError: true;
  site: string;
  name: string;
  price: number;
  currency: string;
  link: string;
}

export interface Error {
  isError: false;
  errorMsg: string;
}
