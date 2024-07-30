# Eshop Scraper (eshop-scraper)

**Eshop Scraper is a npm package.**

```console
npm i eshop-scraper
```

## What it does (in short)

This package can be used for getting some important data like **price, currency, name** from various famous e-commerce websites like **Amazon, Steam, Walmart etc.**

## Support

```json
{
  "node": ">=16.16.0",
  "npm": ">=8.11.0"
}
```

## Getting Started

### Create a instance of eshop-scraper class

```js
import eshop_scraper from 'eshop-scraper';
const scraper = new eshop_scraper();
```

### Use `.getData()` method of the class to scrape

```js
import eshop_scraper from 'eshop-scraper';
const scraper = new eshop_scraper();

(async () => {
  let res = await scraper.getData('https://www.test.com/product/355223235');
  console.log(res);
})();
```

## .getData()

The method is used to scrape an website data thats entry is available in `_webprops`.

### Parameter

The method takes a single parameter.<br/>
Pass the absolute uri of the item you want to scrape inside the function.

```js
scraper.getData(uri);
```

### Output

It will will output a promise. Use _async/await_ to handle the output.<br/>

Sample output:

```js
{
  price: 140.36,
  currency: 'USD',
  name: 'Test Item',
  site: 'Test',
  link: 'https://www.test.com/product/355223235'
}
```

## Config

Pass new configs inside the class to config some extra things. It's optional because some common configs are already included in the scraper to use without any configuration.

### Insert new entries

You can insert new entries in the scraper, then you can scrape items from that website just like the default entries.

```js
import eshop_scraper from 'eshop-scraper';

// create a map with new entries
const propsList = new Map([
  [
    'test.com', // website's domain or subdomain
    {
      site: 'Test', // website's name
      selector: {
        price: ['span[itemprop="price"]'], // items's price html selector
        name: ['h1[itemprop="name"]'], // items's name html selector
      },
    },
  ],
  // follow the same structure and add many more sites, inside the map
]);

const config = {
  webprops: propsList, // pass a map with new entries in webprops
};

const scraper = new eshop_scraper(config);
```

### Replace or exclude extra things

Exclude extra things to make the scraper work. The scraper needs to get a string like "\$50.30" or "USD 40" or "30 \$" from the price selector.

```js
import eshop_scraper from 'eshop-scraper';

const obj = {
  'price is:': '', // pass empty string to exclude
  now: '',
  usd: '$', // replace one string with another
};

const config = {
  replaceobj: obj, // pass an object in replaceobj
};

const scraper = new eshop_scraper(config);
```

### Insert new currencies

Some websites may show prices in bitcoin or some unknown currency, to show them in proper way you need to map them. Otherwise you will get `undefined` in `currency` output.

```js
import eshop_scraper from 'eshop-scraper';

// create a map with new currencies
const currencyList = new Map([
  ['$', 'USD'],
  [['euro', '€'], 'EUR'], // to map multiple strings to one currency put the strings inside an array
  // follow the same structure and add many more currencies, inside the map
]);

const config = {
  currencymap: currencyList, // pass a map with new currency entries in currencymap
};

const scraper = new eshop_scraper(config);
```

### Insert new set of headers

To make the scraper look realistic and prevent the website from blocking the ip, realistic headers are need to be set.

```js
import eshop_scraper from 'eshop-scraper';

const newheaders = [
  {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
  },
  {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
  },
  // add many more headers inside the array
];

const config = {
  headersarr: newheaders, // pass a arrray with new set of headers in headersarr
};

const scraper = new eshop_scraper(config);
```

### Set timeout

If the request takes longer time than the set amount of time and the website doesn't response within that time then the request will be cancelled.

```js
import eshop_scraper from 'eshop-scraper';

const config = {
  timeout: 10, // pass an integer in timeout (counted as second)
};

const scraper = new eshop_scraper(config);
```

## Check default values

Use these only to check default valuess, directly replacing values with new values not recommended.

```js
import eshop_scraper from 'eshop-scraper';
const scraper = new eshop_scraper();
(async () => {
  let defProps = scraper._webprops; // default supported websites
  let defReplaceStrings = scraper._replaceobj; // default replaced strings
  let defHeaders = scraper._headers; // default set of headers
  let defTimeout = scraper._timeoutAmount; // default timeout amount
  let defCurrencyMap = scraper._currencymap; // default currency map

  console.log('Supported websites:', defProps, '\n');
  console.log('Replaced strings:', defReplaceStrings, '\n');
  console.log('Headers:', defHeaders, '\n');
  console.log('Currency map:', defCurrencyMap, '\n');
  console.log('Timeout amount:', defTimeout, '\n');

  process.exit(0);
})();
```

## Supported websites

It supports **12** websites by default and more can be added very easily.

### Websites list

1. Steam (store.steampowered.com)
2. Amazon (amazon.com, amazon.in)
3. Walmart (walmart.com)
4. Crutchfield (crutchfield.com)
5. Playstation (store.playstation.com, gear.playstation.com, direct.playstation.com)
6. Rakuten (fr.shopping.rakuten.com)
7. Ebay (ebay.com)
8. Ebags (ebags.com)
9. Bikroy (bikroy.com)
10. Flipkart (flipkart.com)
11. Etsy (etsy.com)
12. Avito (avito.ru)

## Note

Some websites may show unexpected result. Because all websites doesn't support the same way of scraping. Also this scraper is made for static websites. Dynamic / Single Page websites won't work with this scraper. Those will be supported in future version of this scraper.
<br/>

Some websites may show prices like "2345" instead of "23.45" because those websites initially shows the price without any dot or shows with a comma and later dynamically changed with a dot, as comma is excluded by the scraper and the scraper can't execute javascript while scraping, that's why the price is shown as "2345".
<br/>

Some websites shows price in local language. The scraper processes the price that's got from the website and it only understands English. So the price has to be in English. Otherwise it will return `NaN` in price output and `undefined` in currency output.

## Contribute

Contribute in the project by opening a pull request on github. Contributions are welcomed!

**<p align="center">Proudly Made In Bangladesh 🇧🇩</p>**
