# Eshop Scraper (eshop-scraper)

**Eshop Scraper is a powerful npm package designed for web scraping e-commerce websites.**

## Installation

To install the package, use one of the following commands:

```sh
npm install eshop-scraper
```
```sh
pnpm add eshop-scraper
```
```sh
yarn add eshop-scraper
```

## What it does

This package allows you to extract important data such as **price, currency, and name** from various well-known e-commerce websites, including **Amazon, Steam, Ebay**, and many others. It facilitates efficient web scraping for obtaining detailed product information.
## Support

```json
{
  "node": ">=20.11.0",
  "npm": ">=10.2.4",
}
```

## Getting Started

### Create an Instance of `EshopScraper`
First, you need to create an instance of the `EshopScraper` class. Configure it with optional parameters as needed:

```ts
import { EshopScraper, ResultData } from 'eshop-scraper';

const scraper: EshopScraper = new EshopScraper({
  timeout: 15, // Timeout for requests in seconds
  // Additional configuration options
});
```

### Use `.getData()` Method to Scrape Data
Call the `.getData()` method to scrape data from the provided URL:

```ts
import { EshopScraper, ResultData } from 'eshop-scraper';

const scraper = new EshopScraper({
  timeout: 15,
});

(async () => {
  try {
    const result: ResultData = await scraper.getData('https://example.com/product-page');
    
    if (result.isError) {
      console.error('Error:', result.errorMsg);
    } else {
      console.log('Product Data:', result);
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
  }
})();
```

### `.getData()`
This method scrapes data from a website based on the provided configuration.

### Parameters
The method takes a single parameter:
- `link` (string): The absolute URI of the item you want to scrape.

```ts
await scraper.getData(uri);
```

### Output
It returns a Promise that resolves to an object with the following structure:

```ts
{
  price?: number; // The price of the product
  currency?: string; // The currency of the price
  name?: string; // The name of the product
  site?: string; // The source website's name
  link?: string; // The link to the product page
  isError?: boolean; // Whether an error occurred
  errorMsg?: string; // The error message, if any
}
```

## Configuration
You can customize the scraper by providing additional configurations.

### Insert New Entries
Add new website configurations to the scraper:

```ts
import { EshopScraper } from 'eshop-scraper';

const propsList = new Map([
  ['test.com', {
    site: 'Test',
    selectors: {
      priceSelector: ['span[itemprop="price"]'],
      nameSelector: ['h1[itemprop="name"]'],
    },
  }],
]);

const scraper = new EshopScraper({
  webProps: propsList,
});
```

### Replace or Exclude Strings
Modify or exclude certain strings in the scraped data:

```ts
import { EshopScraper } from 'eshop-scraper';

const replaceObj = {
  'price is:': '',
  now: '',
  usd: '$',
};

const scraper = new EshopScraper({
  replaceObj: replaceObj,
});
```

### Insert New Currencies
Map additional currencies for accurate conversion:

```ts
import { EshopScraper } from 'eshop-scraper';

const currencyList = new Map([
  [['$'], 'USD'],
  [['euro', '€'], 'EUR'],
]);

const scraper = new EshopScraper({
  currencyMap: currencyList,
});
```

### Insert New Set of Headers
Provide custom headers to mimic realistic browser requests:

```ts
import { EshopScraper } from 'eshop-scraper';

const newHeaders = [
  {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
  },
  {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
  },
];

const scraper = new EshopScraper({
  headersArr: newHeaders,
});
```

### Set Timeout
Configure the request timeout:

```ts
import { EshopScraper } from 'eshop-scraper';

const scraper = new EshopScraper({
  timeout: 10, // Timeout in seconds
});
```

## Check Default Values
Use this script to inspect default values for supported websites, replaced strings, headers, and more:

```js
import { EshopScraper } from 'eshop-scraper';

const scraper = new EshopScraper();

(async () => {
  console.log('Supported websites:', scraper._webProps);
  console.log('Replaced strings:', scraper._replaceObj);
  console.log('Headers:', scraper._headers);
  console.log('Currency map:', scraper._currencyMap);
  console.log('Timeout amount:', scraper._timeoutAmount);

  process.exit(0);
})();

```

## Supported Websites

The `eshop-scraper` package supports **8** websites by default. Additional websites can be added through configuration.

### Default Supported Websites

1. **Steam** (store.steampowered.com)
2. **Amazon** (amazon.com, amazon.in)
3. **Crutchfield** (crutchfield.com)
4. **Playstation** (store.playstation.com, gear.playstation.com)
5. **Ebay** (ebay.com)
6. **Bikroy** (bikroy.com)

## Note

### Limitations

- **Static vs. Dynamic Websites**: This scraper is designed for static websites. It does not support dynamic or Single Page Applications (SPAs) at this time. Future versions may include support for dynamic content.

- **Price Format Issues**: Some websites might display prices in an unexpected format. For instance, prices may initially appear without a decimal point or use a comma instead of a dot. The scraper cannot execute JavaScript, so it cannot dynamically convert these formats. As a result, prices may be shown incorrectly (e.g., "2345" instead of "23.45").

- **Language and Currency**: The scraper processes prices in English. If a website displays prices in a local language or script, the scraper might not interpret them correctly. Ensure that the price format is in English for accurate results.

## Contribute

We welcome contributions to the `eshop-scraper` project! To contribute, please open a pull request on [GitHub](https://github.com/israfil-miya/eshop-scraper/pulls). Your input helps improve the scraper for everyone.
