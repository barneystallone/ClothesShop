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
      getRelatedProducts: async (slug) => impl.getRelatedProducts(slug),
      getProductsByCategoryIDs: async (data) => impl.getProductsByCategoryIDs(data),
      addSuggestions: async (data) => impl.addSuggestions(data),
      getSearchProducts: async (data) => impl.getSearchProducts(data),
      getAutoSuggest: async (data) => impl.getAutoSuggest(data),
    }
    return db
  },
}
