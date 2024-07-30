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
