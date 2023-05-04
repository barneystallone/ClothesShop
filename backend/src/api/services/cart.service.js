const redisDao = require('../daos/cart.dao').getDB('redis')

var that = (module.exports = {
  init: async () => {
    redisDao.init().then(() => ({}))
  },

  getCart: async (userId) => {
    return redisDao.getCart(userId)
  },
  setCart: async (data) => {
    return redisDao.setCart(data)
  },

  /**
   *  kiểm tra nếu tồn tại thì sẽ  update số lượng của sản phẩm
   *  Không tồn tại => thêm mới sản phẩm
   */
  setCartItem: async (data) => {
    const isExists = await redisDao.isExistsItem(data)
    if (isExists) {
      return redisDao.updateItemQuantity(data)
      // return redisDao.updateItem(data)
    }
    return redisDao.addItem(data)
  },

  /**
   *  kiểm tra nếu tồn tại trong cart sản phẩm có cùng sizeId, itemId:
   *  ✅ update số lượng của sản phẩm đó và xóa sản phẩm muốn update (xóa theo index)
   *  ❌ Update sản phẩm đó (update theo index truyền vào)
   */
  updateItem: async (data) => {
    const { itemId, pId, sizeId, quantity, userId, sizeName, index } = data
    const isExists = await redisDao.isExistsItem(data)
    console.log('isExists', isExists)
    if (isExists) {
      const updatePromise = redisDao.updateItemQuantity({ userId, itemId, sizeId, quantity })
      const getItemPromise = redisDao.getItemByIndex({ userId, index })
      const [updateStatus, result] = await Promise.all([updatePromise, getItemPromise])
      if (!(result.itemId === itemId && result.sizeId === sizeId)) {
        const removeStatus = await redisDao.removeItem({ index, userId })
        return { updateStatus, removeStatus }
      }
      return { updateStatus }
    }
    return redisDao.updateItem({ itemId, pId, sizeId, quantity, userId, sizeName, index })
  },
  updateItemQuantity: async (data) => {
    return redisDao.updateItemQuantity(data)
  },

  getItemByIndex: async (data) => {
    return redisDao.getItemByIndex(data)
  },
})
