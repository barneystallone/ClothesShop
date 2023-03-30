const Category = require('../models/category.model');

const redisClient = require('../databases/init.redis').getClient();

var self = module.exports = {
    getCategories: async () => {
        const cachedResult = await redisClient.get('categories');
        if (!cachedResult) {
            const categories = await Category.getCategories();
            redisClient.set('categories', JSON.stringify(categories), {
                EX: 30,
                NX: true
            }).then(res => console.log('Caching categories:::', res));
            return categories;
        }
        return JSON.parse(cachedResult);

        // non-cache
        // return Category.getAll();
    }
}