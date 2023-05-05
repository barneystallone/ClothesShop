module.exports = {
  getDB: (dbName) => {
    const impl = require('./daoLoader').loadDao('cart', dbName)

    const db = {
      init: async (data) => impl.init(data),
      addItem: async (data) => impl.addItem(data),
      isExistsItem: async (data) => impl.isExistsItem(data),
      updateItemByIndex: async (data) => impl.updateItemByIndex(data),
      patchItemQuantity: async (data) => impl.patchItemQuantity(data),
      putItemQuantity: async (data) => impl.putItemQuantity(data),
      removeItem: async (data) => impl.removeItem(data),
      getCart: async (userId) => impl.getCart(userId),
      setCart: async (data) => impl.setCart(data),
      getItemByIndex: async (data) => impl.getItemByIndex(data),
    }
    return db
  },
}
