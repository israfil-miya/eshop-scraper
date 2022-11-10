/*
Really don't know how this works..
😅😅😅
*/

export default function titleCase(str) {
  const splitStr = str.toLowerCase().split(' ')

  // exceptions like be, for, with etc.
  const exceptions = [
    'a',
    'an',
    'the',
    'for',
    'and',
    'nor',
    'but',
    'or',
    'yet',
    'so',
    'with',
    'at',
    'from',
    'into',
    'upon',
    'of',
    'to',
    'in',
    'for',
    'on',
    'by',
    'like',
    'over',
    'plus',
    'but',
    'up',
    'down',
    'off',
    'near',
  ]

  const result = splitStr.map((word) => {
    const formattedWord =
      exceptions.indexOf(word) == -1
        ? word.charAt(0).toUpperCase() + word.substring(1)
        : word
    return formattedWord
  })
  const array = result.join(' ')
  return array
}
