module.exports = {
    getDB: (dbName) => {
        const impl = require('./daoLoader').loadDao('product', dbName);

        const db = {
            create: async (model) => impl.create(model),
            getProducts: async (options) => impl.getProducts(options),
            isExists: async ({ slug, id }) => impl.isExists.isExists({ slug, id })
        }
        return db;
    }

}