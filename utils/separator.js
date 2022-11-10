// analyze currency and return a globally accepted currency
const setCurrency = (txt) => {
  if (txt == 'tk' || txt == '৳') {
    return 'BDT'
  } else if (txt == 'usd' || txt == '$') {
    return 'USD'
  } else if (txt == 'rs' || txt == '₹') {
    return 'INR'
  } else if (txt == 'gbp' || txt == '£') {
    return 'GBP'
  } else if (txt == 'euro' || txt == '€') {
    return 'EUR'
  } else {
    return undefined
  }
}

// replace multiple words to something else at once
String.prototype.allReplace = function (obj) {
  var retStr = this
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
  }
  return retStr
}
const replaceString = {
  'currentprice:': '',
  ',': '',
  'price:': '',
}
// separated raw currency (returns currency as string)
const currencySperated = (arr) => {
  var arr2 = []
  for (var i = 0; i < arr.length; i++) {
    if (isNaN(parseFloat(arr[i].toString()))) {
      arr2.push(arr[i])
      break
    }
  }
  return arr2.toString()
}
// separated price (returns price as a number)
const priceSperated = (arr) => {
  var arr2 = []
  for (var i = 0; i < arr.length; i++) {
    if (!isNaN(parseFloat(arr[i].toString()))) {
      arr2.push(arr[i])
      break
    }
  }
  return parseFloat(arr2)
}

export default function separatePriceAndCurrency(str) {
  const rawArray = str
    .trim()
    .replace(/\s+/g, '')
    .allReplace(replaceString)
    .match(/[\d\.]+|\D+/g) // separate price and currency as a array from raw string containing both price and currency, ex. "$56.10"

  // prepare variables to return
  const currency = setCurrency(currencySperated(rawArray))
  const price = priceSperated(rawArray)
  return {
    currency,
    price,
  }
}
