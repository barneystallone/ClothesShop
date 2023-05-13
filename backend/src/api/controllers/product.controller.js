const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const slugify = require('slugify')
const { productValidate, searchKeywordValidate } = require('../utils')
const productService = require('../services/product.service')
const nanoid = require('../utils/nanoid')

var self = (module.exports = {
  insertProduct: asyncHandler(async (req, res, next) => {
    if (!req.body.title) {
      next(createHttpError.BadRequest('Product title is required'))
    }

    const options = {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    }
    req.body.slug = slugify(req.body.title, options)

    const { error } = productValidate(req.body)
    if (error) {
      next(createHttpError.BadRequest(error.details[0].message))
    }
    req.body.pId = 'N6p' + (await nanoid(10))
    const affectedRows = await productService.insertProduct(req.body)
    if (affectedRows) {
      return res.status(200).json({
        insertedId: req.body.pId,
      })
    }
    next(createHttpError('Lỗi insert sản phẩm'))
  }),

  getAllProduct: asyncHandler(async (req, res, next) => {
    const { c: strListId, page } = req.query
    if (strListId) {
      const results = await productService.getProductsByCategoryIDs({
        strListId,
        page: page ?? 1,
      })
      return res.status(200).json(results)
    }

    const results = await productService.getProducts(page)
    res.status(200).json(results)
    // res.status(200).json(results)
    // const s_results = JSON.stringify(results)
    // res.status(200).json(s_results.repeat(50))
  }),
  findBySlug: asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    const result = await productService.findBySlug(slug)
    if (result.count === 0) {
      next(createHttpError.NotFound())
    }
    res.status(200).json({
      ...result,
      meta: {
        slug,
      },
    })

    //
  }),
  getRelatedProducts: asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    try {
      const result = await productService.getRelatedProducts(slug)
      res.status(200).json({
        ...result,
        meta: {
          slug,
        },
      })
    } catch (error) {
      if (error?.message.includes('number 0 is not iterable')) {
        next(createHttpError(404, 'NotFound'))
      }

      next(createHttpError(error))
    }
  }),
  // upload image , insert item cho sản phẩm
  upload: asyncHandler(async (req, res, next) => {
    const { img, thumbImg } = req.files
    const { pId } = req.params
    const { colorName, colorCode } = req.body
    const payload = { pId, colorName, colorCode, img, thumbImg }
    const data = await productService.upload(payload)
    res.json(data)
  }),
  /**
   * page === undefind || null => Lấy ra auto-suggest và các sản phẩm tìm thấy theo keyword
   * page === 1 => Lấy ra danh sách product tìm kiếm theo keyword
   */
  searchProduct: asyncHandler(async (req, res, next) => {
    const { error } = searchKeywordValidate(req.query)
    if (error) {
      return next(createHttpError.BadRequest(error.details[0].message))
    }
    const { keyword, page } = req.query
    if (page >= 0) {
      const result = await productService.getSearchProducts({ keyword: keyword.trim(), page })
      return res.status(200).json({ ...result, meta: { keyword, page } })
    }
    const result = await productService.getSearchProducts({ keyword: keyword.trim() })
    res.status(200).json({ ...result, meta: { keyword } })
  }),
  getAutoSuggest: asyncHandler(async (req, res, next) => {
    const { error } = searchKeywordValidate(req.query)
    if (error) {
      return next(createHttpError.BadRequest(error.details[0].message))
    }
    const { keyword } = req.query
    const result = await productService.getAutoSuggest({ keyword: keyword.trim() })
    res.status(200).json({ listSuggest: result, meta: { keyword } })
  }),
})
