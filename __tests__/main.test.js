import price_finder from '../main.js'

const strCheck = (str) => (typeof str === 'string') ? true : false
const numCheck = (num) => (typeof num === 'number') ? true : false

// product links
const othoba = 'https://www.othoba.com/vision-ac-2-ton-cxh-h-c-3d-elite-rfr00095'
const steam =
  'https://store.steampowered.com/app/460930/Tom_Clancys_Ghost_Recon_Wildlands/'
const amazon = 'https://www.amazon.com/Apple-iPhone-12-Pro-Max/dp/B09JF9WMR9/'
const amazon_in =
  'https://www.amazon.in/Samsung-Burgundy-Storage-Additional-Exchange/dp/B09SH7FDKT/'
const walmart =
  'https://www.walmart.com/ip/Pompeian-Organic-Robust-Extra-Virgin-Olive-Oil-16-fl-oz/13281639'
const crutchfield =
  'https://www.crutchfield.com/p_500ILXF411/Alpine-Halo11-iLX-F411.html'
const playstation =
  'https://store.playstation.com/en-gb/product/EP0082-PPSA03233_00-SOPFFORIGINDDE00'
const priceminister =
  'https://fr.shopping.rakuten.com/offer/buy/7307367871/le-grand-monde-format-broche.html'
const ebay = 'https://www.ebay.com/p/13010391607'
const ebags =
  'https://www.ebags.com/luggage/luggage-sets/supra-dlx-3-piece-set/130863XXXX.html'
const bikroy =
  'https://bikroy.com/en/ad/epson-ecotank-l3210-multifunction-inktank-printer-for-sale-sylhet-4'
const flipkart =
  'https://www.flipkart.com/philips-hp8100-46-hair-dryer/p/itmfhbrgkk38zkfz'
const etsy =
  'https://www.etsy.com/listing/737271222/tiny-initial-bracelet-tiny-gift-bracelet'

// expected results
const othoba_expected_currency = 'BDT'
const steam_expected_currency = 'USD'
const amazon_expected_currency = 'USD'
const amazon_in_expected_currency = 'INR'
const walmart_expected_currency = 'USD'
const crutchfield_expected_currency = 'USD'
const playstation_expected_currency = 'GBP'
const priceminister_expected_currency = 'EUR'
const ebay_expected_currency = 'USD'
const ebags_expected_currency = 'USD'
const bikroy_expected_currency = 'BDT'
const flipkart_expected_currency = 'INR'
const etsy_expected_currency = 'USD'

// jest timeout configuration
jest.setTimeout(25000)
// currency code for testing currency conversion
const currencyCode = 'EUR'

// function for testing sites
function testSite(link, txt, currencyExpected) {
  test(txt, async () => {
    let res = await price_finder(link)
    expect(numCheck(parseInt(res.price))).toBeTruthy()
    expect(res.currency).toBe(currencyExpected)
    expect(strCheck(res.name)).toBeTruthy()
  })
}

describe('|| SHOULD WORK ALL WEBSITES ||', () => {
  // all tests

  testSite(
    othoba,
    'should fetch price, currency and name of Othoba website',
    othoba_expected_currency,
  )

  testSite(
    steam,
    'should fetch price, currency and name of Steam website',
    steam_expected_currency,
  )

  testSite(
    amazon,
    'should fetch price, currency and name of Amazon.com website',
    amazon_expected_currency,
  )

  testSite(
    amazon_in,
    'should fetch price, currency and name of Amazon.in website',
    amazon_in_expected_currency,
  )

  testSite(
    walmart,
    'should fetch price, currency and name of Walmart website',
    walmart_expected_currency,
  )

  testSite(
    crutchfield,
    'should fetch price, currency and name of Crutchfield website',
    crutchfield_expected_currency,
  )

  testSite(
    playstation,
    'should fetch price, currency and name of PlayStation website',
    playstation_expected_currency,
  )

  testSite(
    priceminister,
    'should fetch price, currency and name of PriceMinister website',
    priceminister_expected_currency,
  )

  testSite(
    ebay,
    'should fetch price, currency and name of E-Bay website',
    ebay_expected_currency,
  )

  testSite(
    ebags,
    'should fetch price, currency and name of E-Bags website',
    ebags_expected_currency,
  )

  testSite(
    bikroy,
    'should fetch price, currency and name of Bikroy website',
    bikroy_expected_currency,
  )
  testSite(
    flipkart,
    'should fetch price, currency and name of Flipkart website',
    flipkart_expected_currency,
  )
  testSite(
    etsy,
    'should fetch price, currency and name of Etsy website',
    etsy_expected_currency,
  )
})

/*

// ADD TEST FOR NEW WEBSITE/S

// inside "describe" Function
// write like this...
// (as a reference, follow how I wrote)

testSite(<particular website item link>, <what it should do>, <expected returned currency>);

*/

// end of the main test file
