module.exports = {
  getDB: (dbName) => {
    const impl = require('./daoLoader').loadDao('product', dbName)

    const db = {
      init: async () => impl.init(),
      create: async (model) => impl.create(model),
      getProducts: async (options) => impl.getProducts(options),
      isExists: async ({ slug, id }) => impl.isExists({ slug, id }),
      isExistsItem: async (data) => impl.isExistsItem(data),
      uploadImg: async (item) => impl.uploadImg(item),
      putProducts: async (data) => impl.putProducts(data),
      findBySlug: async (slug) => impl.findBySlug(slug),
      findRelatedProducts: async (slug) => impl.findRelatedProducts(slug),
      getProductsByCategoryIDs: async (data) => impl.getProductsByCategoryIDs(data),
    }
    return db
  },
}
