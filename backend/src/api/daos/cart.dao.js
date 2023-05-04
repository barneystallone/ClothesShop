module.exports = {
  getDB: (dbName) => {
    const impl = require('./daoLoader').loadDao('cart', dbName)

    const db = {
      init: async (data) => impl.init(data),
      addItem: async (data) => impl.addItem(data),
      isExistsItem: async (data) => impl.isExistsItem(data),
      updateItem: async (data) => impl.updateItem(data),
      updateItemQuantity: async (data) => impl.updateItemQuantity(data),
      removeItem: async (data) => impl.removeItem(data),
      getCart: async (userId) => impl.getCart(userId),
      setCart: async (data) => impl.setCart(data),
      getItemByIndex: async (data) => impl.getItemByIndex(data),
    }
    return db
  },
}
