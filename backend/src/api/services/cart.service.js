const redisDao = require('../daos/cart.dao').getDB('redis')

var that = (module.exports = {
  init: async () => {
    redisDao.init().then(() => ({}))
  },

  getCart: async (userId) => {
    return redisDao.getCart(userId)
  },

  /**
   *  Đồng bộ giỏ hàng
   */
  syncCartToDB: async (data, userId) => {
    const arrPromise = data.reduce((arr, item, index) => {
      arr[index] = that.setCartItem({ ...item, userId })
      return arr
    }, [])
    return Promise.all(arrPromise)
  },

  /**
   *  kiểm tra nếu tồn tại thì sẽ  update số lượng của sản phẩm
   *  Không tồn tại => thêm mới sản phẩm
   */
  setCartItem: async (data) => {
    // data -> { itemId, pId, sizeId, quantity, userId, sizeName }
    const isExists = await redisDao.isExistsItem(data)
    if (isExists) {
      return { quantity: await redisDao.patchItemQuantity(data), meta: data }
    }
    return {
      totalItem: await redisDao.addItem(data),
      meta: {
        ...data,
      },
    }
  },

  /**
   *  kiểm tra nếu tồn tại trong cart sản phẩm có cùng sizeId, itemId:
   *  ✅ update số lượng của sản phẩm đó và xóa sản phẩm muốn update (xóa theo index)
   *  ❌ Update sản phẩm đó (update theo index truyền vào)
   */
  updateItem: async (data) => {
    const { itemId, pId, sizeId, quantity, userId, sizeName, index } = data
    const isExists = await redisDao.isExistsItem(data)
    if (isExists) {
      const _item = await redisDao.getItemByIndex({ userId, index })
      if (!(_item.itemId === itemId && _item.sizeId === sizeId)) {
        const updatePromise = redisDao.patchItemQuantity({ userId, itemId, sizeId, quantity })
        const removeItemPromise = redisDao.removeItem({ index, userId })
        const [updateStatus, removeStatus] = await Promise.all([updatePromise, removeItemPromise])
        return { updateStatus, removeStatus }
      }
    }
    return redisDao.updateItemByIndex({ itemId, pId, sizeId, quantity, userId, sizeName, index })
  },
  patchItemQuantity: async (data) => {
    return redisDao.patchItemQuantity(data)
  },
  putItemQuantity: async (data) => {
    return redisDao.putItemQuantity(data)
  },
  removeItem: async (data) => {
    return redisDao.removeItem(data)
  },
})
