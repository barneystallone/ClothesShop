const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const slugify = require('slugify')
const { productValidate } = require('../utils')
const productService = require('../services/product.service')
const nanoid = require('../utils/nanoid')

var self = (module.exports = {
  insertProduct: asyncHandler(async (req, res, next) => {
    if (!req.body.title) {
      next(createHttpError('product title is require'))
    }

    const options = {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    }
    req.body.slug = slugify(req.body.title, options)

    const { error } = productValidate(req.body)
    if (error) {
      next(createHttpError(error.details[0].message))
    }
    req.body.pId = 'N6p' + (await nanoid(10))
    const affectedRows = await productService.insertProduct(req.body)
    if (affectedRows) {
      return res.status(200).json({
        status: 'success',
        insertedId: req.body.pId,
      })
    }
    next(createHttpError('Lỗi insert sản phẩm'))
  }),

  getAllProduct: asyncHandler(async (req, res, next) => {
    const results = await productService.getAllProducts()
    res.status(200).json(results)
    // const s_results = JSON.stringify(results)
    // res.status(200).json(s_results.repeat(50))
  }),

  // ipload image , insert 1 item của sản phẩm
  // 1 sp có nhiều item
  upload: asyncHandler(async (req, res, next) => {
    const { img, thumbImg } = req.files
    const { pId } = req.params
    const { colorName, colorCode } = req.body
    const payload = { pId, colorName, colorCode, img, thumbImg }
    const affectedRows = await productService.upload(payload)
    affectedRows ? res.json(affectedRows) : next(createHttpError('Lỗi insert item'))
  }),
})
