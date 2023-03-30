

module.exports = {

    // onFullfilled throw err => next() : middleware handle lỗi
    // wrap controller
    asyncHandler: fn => (req, res, next) => {
        // console.log(fn(req, res, next));
        Promise.resolve(
            fn(req, res, next)
<<<<<<< HEAD
        ).catch(next)
    },


=======
        ).catch((e) =>
            next(e)
        )
    }
>>>>>>> c18c934 ([BE] Api get category)
}