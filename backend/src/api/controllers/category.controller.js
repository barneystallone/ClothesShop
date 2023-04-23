const { asyncHandler } = require('../middleware')
const { getCategories } = require('../services/category.service')

var self = (module.exports = {
  getCategories: asyncHandler(async (req, res, next) => {
    const categories = await getCategories()
    return res.json(categories)
  }),
})
