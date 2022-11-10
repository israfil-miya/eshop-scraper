import titleCase from '../utils/titleCase.js'

// titleCase utility test
test('should title case string', () => {
  expect(titleCase('hey there')).toBe('Hey There')
})

import separatePriceAndCurrency from '../utils/separator.js'

// separator utility test
test('should separate price and currency', () => {
  expect(separatePriceAndCurrency('$59.699').price).toBe(59.699)
  expect(separatePriceAndCurrency('$59.699').currency).toBe('USD')
})
