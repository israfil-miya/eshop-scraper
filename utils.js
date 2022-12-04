String.prototype.allReplace = function (obj) {
  var retStr = this
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
  }
  return retStr
}

const mapReducer = (arr, [keys, val]) => [
  ...arr,
  ...(Array.isArray(keys) ? [...keys.map((key) => [key, val])] : [[keys, val]]),
]

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

export const $ = (dom, selecetor) =>
  dom.window.document.querySelector(selecetor)
export const setHeader = (array) =>
  array[Math.floor(Math.random() * array.length)]
export const titleCase = (str) =>
  str.replace(
    /\p{L}+('\p{L}+)?/gu,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1),
  )
export const setCurrency = (txt, currencymap) =>
  new Map([...currencymap.entries()].reduce(mapReducer, [])).get(txt)

export const mergeMaps = (map1, map2) => {
  const mapCopy1 = new Map(map1)
  const mapCopy2 = new Map(map2)

  mapCopy1.forEach((value, key) => {
    if (!mapCopy2.has(key)) {
      mapCopy2.set(key, value)
    } else {
      const newValue = mapCopy2.get(key)
      mapCopy2.set(key, newValue)
      mapCopy1.delete(key)
    }
  })

  return new Map([...mapCopy1, ...mapCopy2])
}

export const siteProps = (link, webprops) => {
  try {
    let webdomain = link.replace('www.', '').split('/')[2].trim()
    const prop = webprops.get(webdomain)
    if (!prop) throw new Error('No site found')

    const siteName = prop.site
    const selectorsList = prop.selector
    const priceSelector = selectorsList.price.join(', ')
    const nameSelector = selectorsList.name.join(', ')
    const siteUri = webdomain
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

export function separator(str, replaceString) {
  const rawArray = str
    .trim()
    .replace(/\s+/g, '')
    .allReplace(replaceString)
    .match(/[\d\.]+|\D+/g)
  const currency = currencySperated(rawArray)
  const price = priceSperated(rawArray)
  return {
    currency,
    price,
  }
}
