import axios from 'axios'
const timeoutAmount = 10 * 1000
let abortController = new AbortController()
const timeout = setTimeout(() => {
  abortController.abort()
}, timeoutAmount)

import _ from 'lodash'

import titleCase from './utils/titleCase.js' // function used for title case the product name
import { JSDOM } from 'jsdom'
const $ = (dom, selecetor) => dom.window.document.querySelector(selecetor) // select the html tag based on "selecetor"
import { headers, setHeader } from './utils/headers.js' // function for setting axios headers
import separatePriceAndCurrency from './utils/separator.js' // function used for separating price and currency from a string
import webs from './website_props.js' // list of all websites with their properties

function isObject(val) {
  if (val === null) {
    return false
  }
  return typeof val === 'function' || typeof val === 'object'
}
async function getPriceConverted(price, baseCode, code) {
  const { data } = await axios.get(
    'https://v6.exchangerate-api.com/v6/522bf58887ecce0f6af15527/latest/' +
      baseCode,
    {
      timeout: timeoutAmount,
    },
  )

  const exchangeRate = data.conversion_rates[code]
  return {
    price_converted: parseFloat((price * exchangeRate).toFixed(2)),
    converted_to_country_code: code,
  }
}

// get the data based on the product "link"
function siteProps(link) {
  try {
    const webObjectName =
      _.findKey(webs, {
        uri: link.replace('www.', '').split('/')[2].trim(), // analyze the link and get the name (get the key from "webs" object based on link)
      }) || null
    if (webObjectName === null) throw new Error('No site found')

    // prepare variables to return
    const siteName = webs[webObjectName].site
    const selectorsList = webs[webObjectName].selector
    const priceSelector = selectorsList.price.join(', ')
    const nameSelector = selectorsList.name.join(', ')
    const siteUri = webs[webObjectName].uri
    const fullPathLink = link
    return {
      site: siteName,
      selectors: {
        priceSelector,
        nameSelector,
      },
      uri: siteUri,
      link: fullPathLink,
    }
  } catch (err) {
    return {
      IsError: true,
      ErrorMsg: err.message,
    }
  }
}
export default async function getData(link, transform_country_code) {
  try {
    const propsData = siteProps(link) // receive all returned data in a variable

    if (propsData.IsError) throw new Error(propsData.ErrorMsg)

    // getting all resources from page
    let { data } = await axios.get(propsData.link, {
      signal: abortController.signal,
      headers: setHeader(headers),
      timeout: timeoutAmount,
    })
    clearTimeout(timeout)

    const dom = new JSDOM(data)
    if (!$(dom, propsData.selectors.priceSelector))
      throw new Error('Unable to get the product price')

    const price_raw_string = $(dom, propsData.selectors.priceSelector)
      .textContent.toLowerCase()
      .trim() // price and currency raw string
    var price = separatePriceAndCurrency(price_raw_string).price // price filtered

    var currency = separatePriceAndCurrency(price_raw_string).currency // currency filtered

    // currency code for converting currency
    var currencyCode = transform_country_code || null

    if (currencyCode !== null) {
      const priceandcurrency_coverted = await getPriceConverted(
        price,
        currency,
        currencyCode,
      )

      price = priceandcurrency_coverted.price_converted
      currency = priceandcurrency_coverted.converted_to_country_code
    }

    if (!$(dom, propsData.selectors.nameSelector))
      throw new Error('Unable to get the product name')

    const name = titleCase(
      $(dom, propsData.selectors.nameSelector).textContent.trim(),
    ) // title cased name

    const site = propsData.site // the site name
    return {
      price,
      currency,
      name,
      site,
      link,
    }
  } catch (err) {
    if (err.message == 'canceled') err.message = 'Request took too long'
    return {
      IsError: true,
      ErrorMsg: err.message,
    }
  }
}

// FOR TESTING THE PACKAGE

/*
(async()=>{
  let response = await getData('https://chaldal.com/mug-dal-1-kg-5')
  console.log(response)
})()
*/

// end of the main file
