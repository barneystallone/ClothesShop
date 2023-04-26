const numberToCurrency = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const handlePromise = (promise) => {
  return promise.then((data) => [undefined, data]).catch((err) => [err, undefined])
}

const handleLazyLoadSvgPromise = (promise) => {
  return promise.then((module) => ({ default: module.ReactComponent }))
}
export { numberToCurrency, handlePromise, handleLazyLoadSvgPromise }
