export const numberToCurrency = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const handleLazyLoadSvgPromise = (promise) => {
  return promise.then((module) => ({ default: module.ReactComponent }))
}
export const alphabetSort = (a, b) => a.localeCompare(b)

export const typeOf = (any) => {
  return Object.prototype.toString.call(any).slice(8, -1)
}

export const capitalizeWords = (str) => {
  const words = str.split(' ')
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
    .trim()
}
