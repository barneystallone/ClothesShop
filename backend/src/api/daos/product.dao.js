module.exports = {
    getProducts: async (impl, limit, offset) => impl.getProducts(limit, offset),
    getById: async (impl, productId) => impl.getById(limit, productId),
    insertProduct: async (impl, product) => impl.insertProduct(product),
    insertProductCollection: async (impl, productId, subItem) => impl.insertProductCollections(productId, subItem),
    bulkInsertProduct: async (impl, productId, subItem) => impl.bulkInsertProduct(productId, subItem),

    /**
     * 
     * @param {Object} impl 
     * @param {*} product 
     * @returns 
     */
    updateProduct: async (impl, product) => impl.updateProduct(product),
    updateProductCollections: async (impl, productId, subItem) => impl.updateProductCollections(productId, subItem),
}