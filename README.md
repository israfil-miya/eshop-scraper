# Eshop Scraper (eshop-scraper)

**Eshop Scraper is a npm package.**

```console
npm i eshop-scraper
```

## What it does (in short)

This package that can be used for getting some important data like **price, currency, name** from various famous websites like **Amazon, Steam, Walmart etc.**

## Example code snippet

### Code:

```js
import getPrice from 'eshop-scraper'
;(async () => {
  let response = await getPrice(
    'https://bikroy.com/en/ad/computer-pc-for-sale-rangpur-33',
    'USD',
  )
  console.log(response)
})()
```

### Output:

```console
{
  price: 160.95,
  currency: 'USD',
  name: 'Computer Pc',
  site: 'Bikroy.com',
  link: 'https://bikroy.com/en/ad/computer-pc-for-sale-rangpur-33'
}
```

## More info

The module takes **2 parameters**.
First parameter is the absolute **URI** of an item and the second parameter is the **Currency Code** in string (it's optional).

## Features

1. Can get Price of an item
2. Can get the Currency Code of an item
3. Can automatically detect the website from just a link (only for supported websites)
4. Can convert price to almost any country's local currency, only by the Currency Code

## Supported websites

Sorry to say that it doesn't support many websites. But it does support most of the popular e-shops also it's extendable so, you can add many more websites very easily (check `website_props.js` and `main.test.js` files). If any of the bottom websites doesn't work then please open an issue on github. Contributions are welcomed!

### List:

1. Othoba (othoba.com)
2. Steam (store.steampowered.com)
3. Amazon (amazon.com, amazon.in)
4. Walmart (walmart.com)
5. Crutchfield (crutchfield.com)
6. Playstation (store.playstation.com)
7. Priceminister (fr.shopping.rakuten.com)
8. Ebay (ebay.com)
9. Ebags (ebags.com)
10. Bikroy (bikroy.com)
11. Flipkart (flipkart.com)
12. Etsy (etsy.com)

## Tests

```console
npm run test
```

OR

```console
npm run test:watch
```

---

**<p align="center">Proudly Made In Bangladesh 🇧🇩</p>**
