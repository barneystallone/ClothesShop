const createHttpError = require("http-errors");
const { asyncHandler } = require("../middleware");
const slugify = require('slugify');
const { productValidate } = require("../utils");
const productService = require("../services/product.service");
const nanoid = require("../utils/nanoid");

var self = module.exports = {
    insertProduct: asyncHandler(async (req, res, next) => {
        console.log(req.body);
        if (!req.body.title) {
            throw createHttpError('product title is require')
        }

        const options = {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        }
        req.body.slug = slugify(req.body.title, options)

        const { error } = productValidate(req.body)
        if (error) {
            throw createHttpError(error.details[0].message);
        }
        // const {pId, title, slug, description, price, category_id} = req.body
        req.body.pId = 'N6p' + await nanoid()
        const affectedRows = await productService.insertProduct(req.body)
        res.status(200).json(affectedRows)
    }),

    getAllProduct: asyncHandler(async (req, res, next) => {
        const results = await productService.getAllProducts();
        res.status(200).json(results)
    }),
}