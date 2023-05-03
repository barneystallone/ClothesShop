const redisDao = require('../daos/cart.dao').getDB('redis')

var that = (module.exports = {
  init: async () => {
    redisDao.init().then(() => ({}))
  },

  getCart: async (userId) => {
    return
  },
  setCart: async (data) => {
    return redisDao.setCart(data)
  },
  setCartItem: async (data) => {
    const isExists = await redisDao.isExistsItem(data)
    if (isExists) {
      return redisDao.updateItem(data)
    }
    return redisDao.addItem(data)
  },
  updateItemQuantity: async (data) => {
    return redisDao.updateItemQuantity(data)
  },
})
