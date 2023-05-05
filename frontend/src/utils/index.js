const numberToCurrency = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const handleLazyLoadSvgPromise = (promise) => {
  return promise.then((module) => ({ default: module.ReactComponent }))
}

const typeOf = (any) => {
  return Object.prototype.toString.call(any).slice(8, -1)
}
export { numberToCurrency, handleLazyLoadSvgPromise, typeOf }
