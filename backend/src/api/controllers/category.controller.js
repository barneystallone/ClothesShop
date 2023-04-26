const { asyncHandler } = require('../middleware')
const { getCategories } = require('../services/category.service')

var self = (module.exports = {
  getCategories: asyncHandler(async (req, res, next) => {
    const categories = await getCategories()
    setTimeout(() => res.json(categories), 200)
    // return res.json(categories)
  }),
})
