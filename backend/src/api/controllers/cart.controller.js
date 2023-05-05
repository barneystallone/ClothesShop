const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const cartService = require('../services/cart.service')

var that = (module.exports = {
  getCart: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload

    const result = await cartService.getCart(userId)
    res.status(200).json(result)
  }),

  syncCartToDB: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const result = await cartService.syncCartToDB(req.body, userId)
    res.status(200).json(result)
  }),
  setCartItem: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { itemId, sizeId, quantity, index, pId, sizeName } = req.body
    if (req.method === 'PATCH') {
      const result = await cartService.updateItem({ index, itemId, sizeId, userId, quantity, pId, sizeName })
      return res.status(200).json(result)
    }
    /// req.method === 'PUT'
    const result = await cartService.setCartItem({ itemId, pId, sizeId, quantity, userId, sizeName })
    res.status(200).json(result)
  }),

  updateItemQuantity: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { quantity, index } = req.body
    if (req.method === 'PATCH') {
      const result = await cartService.patchItemQuantity({ userId, index, quantity })
      return res.status(200).json(result)
    }
    /// req.method === 'PUT'
    const result = await cartService.putItemQuantity({ userId, index, quantity })
    return res.status(200).json(result)
  }),
  getItemByIndex: asyncHandler(async (req, res, next) => {}),
  // setCart: asyncHandler(async (req, res, next) => {
  //   const { userId } = req.payload
  //   const { itemId, pId, sizeId, quantity, sizeName } = req.body
  //   const result = await cartService.setCart({ itemId, pId, sizeId, quantity, userId, sizeName })
  //   res.status(200).json(result)
  // }),
  // patchCartItem: asyncHandler(async (req, res, next) => {
  //   const { userId } = req.payload
  //   const { itemId, sizeId, value, quantity, index, pId, sizeName } = req.body

  //   const result = await cartService.updateItem({ index, itemId, sizeId, value, userId, quantity, pId, sizeName }) //add
  //   res.status(200).json(result)
  // }),
})
