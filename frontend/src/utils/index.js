const numberToCurrency = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const handleLazyLoadSvgPromise = (promise) => {
  return promise.then((module) => ({ default: module.ReactComponent }))
}
export { numberToCurrency, handleLazyLoadSvgPromise }
