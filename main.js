import axios from 'axios'
import { JSDOM } from 'jsdom'
import {
  titleCase,
  setHeader,
  separator,
  setCurrency,
  $,
  siteProps,
  mergeMaps,
} from './utils.js'
import {
  headers,
  replaceString,
  websiles_props,
  currency_lookup,
} from './values.js'

const abortController = new AbortController()

class eshopScraper {
  constructor({
    timeout = 10,
    webprops,
    replaceobj,
    currencymap,
    headersarr,
  } = {}) {
    this._timeoutAmount = timeout * 1000
    this._timeout = setTimeout(() => {
      abortController.abort()
    }, this._timeoutAmount)

    if (webprops instanceof Map) {
      this._webprops = mergeMaps(websiles_props, webprops)
    } else this._webprops = websiles_props

    if (typeof replaceobj === 'object') {
      this._replaceobj = { ...replaceString, ...replaceobj }
    } else this._replaceobj = replaceString

    if (currencymap instanceof Map) {
      this._currencymap = mergeMaps(currency_lookup, currencymap)
    } else this._currencymap = currency_lookup

    if (headersarr instanceof Array) {
      this._headers = headers.concat(headersarr)
    } else this._headers = headers
  }

  async getData(link) {
    try {
      if (typeof link !== 'string')
        throw new Error('Link is not provided in the first parameter')

      const propsData = siteProps(link, this._webprops)
      if (propsData.IsError) throw new Error(propsData.ErrorMsg)

      let { data } = await axios.get(propsData.link, {
        signal: abortController.signal,
        headers: setHeader(this._headers),
        timeout: this._timeoutAmount,
      })
      clearTimeout(this._timeout)

      const dom = new JSDOM(data)
      if (!$(dom, propsData.selectors.priceSelector))
        throw new Error('Unable to get the product price')

      const raw_string = $(dom, propsData.selectors.priceSelector)
        .textContent.toLowerCase()
        .trim()

      let price = separator(raw_string, this._replaceobj)?.price

      let currency = setCurrency(
        separator(raw_string, this._replaceobj)?.currency,
        this._currencymap,
      )?.toUpperCase()

      if (!$(dom, propsData.selectors.nameSelector))
        throw new Error('Unable to get the product name')

      const name = titleCase(
        $(dom, propsData.selectors.nameSelector).textContent.trim(),
      )

      const site = propsData.site
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
}

export default eshopScraper
