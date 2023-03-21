module.exports = {

    // VD: let [err, data] = await handlerPromise( promise )
    handlerPromise: (promise) => {
        return promise.then(data => ([undefined, data]))
            .catch(err => ([err, undefined]))
    }
}