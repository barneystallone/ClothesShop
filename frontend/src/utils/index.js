const numberToCurrency = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handlePromise = (promise) => {
    return promise.then(data => [undefined, data])
        .catch(err => [err, undefined])
}

export {
    numberToCurrency,
    handlePromise
}