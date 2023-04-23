const { uploader } = require('./uploader')

module.exports = {

    // onFullfilled throw err => next() : middleware handle lỗi
    // wrap controller
    asyncHandler: fn => (req, res, next) => {
        // console.log(fn(req, res, next));
        Promise.resolve(
            fn(req, res, next)
        ).catch(next)
    },

    uploader: uploader,

}