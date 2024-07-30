const currencyLookupMapping: Map<string[], string> = new Map([
  [['tk', '৳'], 'BDT'],
  [['usd', 'us', '$', 'us$'], 'USD'],
  [['rs', '₹'], 'INR'],
  [['gbp', '£'], 'GBP'],
  [['euro', '€'], 'EUR'],
  [['rub', '₽'], 'RUB'],
  [['aud', 'au$', 'a$'], 'AUD'],
  [['jpy', '¥'], 'JPY'],
  [['cad', 'ca$', 'c$'], 'CAD'],
  [['chf', 'swiss franc'], 'CHF'],
]);


export default currencyLookupMapping