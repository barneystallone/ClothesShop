const Category = require('../databases/category.model')

const redisClient = require('../databases/connect.redis.v2')

var self = (module.exports = {
  getCategories: async () => {
    const cachedResult = await redisClient.get('categories')
    if (!cachedResult || cachedResult === 'null') {
      const categories = await Category.getCategories()
      await redisClient
        .set('categories', JSON.stringify(categories), 'EX', 24 * 3600, 'NX')
        .then((res) => console.log('Category cache miss:::', res))

      return categories
    }
    return JSON.parse(cachedResult)

    // non-cache
    // return Category.getAll();
  },
})
