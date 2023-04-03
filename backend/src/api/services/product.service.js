const createHttpError = require("http-errors");
const productDao = require("../daos/product.dao").getDB('mysql');

var self = module.exports = {
    insertProduct: async ({ pId, title, slug, description, price, category_id }) => {
        const model = { pId, title, slug, description, price, category_id };
        const affectedRows = await productDao.create(model);
        console.log(affectedRows);
        return affectedRows;
        // const isExists = await productDao.isExists({slug,id});
        // if(isExists) {
        //     throw createHttpError.Conflict('Lỗi insert, vui lòng thử lại!')
        // }
    },

    getAllProducts: async () => {
        return await productDao.getProducts()
    }
}