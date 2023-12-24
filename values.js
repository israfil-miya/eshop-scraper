export const headers = [
  {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    Referer: 'http://www.google.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Ch-Ua':
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
  },
  {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    Referer: 'http://www.google.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.5',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
  },
]

export const replaceString = {
  'currentprice:': '',
  ',': '',
  'price:': '',
  now: '',
  freetoplay: '0',
  free: '0',
  засутки: '',
  '/ea': '',
}

export const websiles_props = new Map([
  [
    'store.steampowered.com',
    {
      site: 'Steam',
      selector: {
        price: ['div.game_purchase_price', 'div.discount_final_price'],
        name: ['div#appHubAppName_responsive'],
      },
    },
  ],
  [
    'amazon.com',
    {
      site: 'Amazon',
      selector: {
        price: ['span[data-a-color="price"] span.a-offscreen'],
        name: ['#title'],
      },
    },
  ],
  [
    'amazon.in',
    {
      site: 'Amazon',
      selector: {
        price: ['span[data-a-color="price"] span.a-offscreen'],
        name: ['#title'],
      },
    },
  ],
  [
    'walmart.com',
    {
      site: 'Walmart',
      selector: {
        price: ['span[itemprop="price"]'],
        name: ['h1[itemprop="name"]'],
      },
    },
  ],
  [
    'crutchfield.com',
    {
      site: 'Crutchfield',
      selector: {
        price: ['div.price.js-price'],
        name: ['h1.prod-title'],
      },
    },
  ],
  [
    'store.playstation.com',
    {
      site: 'PlayStation',
      selector: {
        price: ['span.psw-t-title-m'],
        name: ['h1[data-qa="mfe-game-title#name"]'],
      },
    },
  ],
  [
    'direct.playstation.com',
    {
      site: 'PlayStation',
      selector: {
        price: ['div.price-text.js-actual-price'],
        name: ['h1.sony-text-h1', 'h2.sony-text-h2'],
      },
    },
  ],
  [
    'gear.playstation.com',
    {
      site: 'PlayStation',
      selector: {
        price: ['div.pw-itemdetail-priceandup span.price'],
        name: ['div.pw-itemdetail-title'],
      },
    },
  ],
  [
    'fr.shopping.rakuten.com',
    {
      site: 'Rakuten',
      selector: {
        price: ['div.v2_fpp_price', 'p.price'],
        name: ['div.v2_fpp_main_title', 'span.detailHeadline'],
      },
    },
  ],
  [
    'ebay.com',
    {
      site: 'E-Bay',
      selector: {
        price: ['p.wt-text-title-01 span[aria-hidden="true"]'],
        name: ['p.anchored-listing-title.wt-text-title-02'],
      },
    },
  ],
  [
    'ebags.com',
    {
      site: 'E-Bags',
      selector: {
        price: ['div.product-price span.price-sales'],
        name: ['h1[itemprop="name"]'],
      },
    },
  ],
  [
    'bikroy.com',
    {
      site: 'Bikroy',
      selector: {
        price: ['div.amount--3NTpl'],
        name: ['h1.title--3s1R8'],
      },
    },
  ],
  [
    'flipkart.com',
    {
      site: 'Flipkart',
      selector: {
        price: ['div._25b18c div._30jeq3'],
        name: ['h1.yhB1nd span'],
      },
    },
  ],
  [
    'etsy.com',
    {
      site: 'Etsy',
      selector: {
        price: [
          'div.wt-grid__item-xs-7 div.n-listing-card__price p',
          'div[data-selector="price-only"]',
        ],
        name: [
          'p.anchored-listing-title a',
          'h1[data-buy-box-listing-title="true"]',
        ],
      },
    },
  ],
  [
    'avito.ru',
    {
      site: 'Avito',
      selector: {
        price: ['span.style-price-value-main-TIg6u'],
        name: ['span.title-info-title-text'],
      },
    },
  ],
])

export const currency_lookup = new Map([
  [['tk', '৳'], 'BDT'],
  [['usd', 'us', '$', 'us$'], 'USD'],
  [['rs', '₹'], 'INR'],
  [['gbp', '£'], 'GBP'],
  [['euro', '€'], 'EUR'],
  [['rub', '₽'], 'RUB'],
])