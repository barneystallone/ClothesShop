const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const cartService = require('../services/cart.service')

var that = (module.exports = {
  getCart: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload

    const result = await cartService.getCart(userId)
    res.status(200).json(result)
  }),
  // setCart: asyncHandler(async (req, res, next) => {
  //   const { userId } = req.payload
  //   const { itemId, pId, sizeId, quantity, sizeName } = req.body
  //   const result = await cartService.setCart({ itemId, pId, sizeId, quantity, userId, sizeName })
  //   res.status(200).json(result)
  // }),

  setCartItem: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { itemId, pId, sizeId, quantity, sizeName } = req.body
    // const result = await cartService.setCartItem({ itemId, sizeId, userId }) //search
    const result = await cartService.setCartItem({ itemId, pId, sizeId, quantity, userId, sizeName }) //add
    res.status(200).json(result)
  }),
  updateCartItem: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { itemId, pId, sizeId, quantity, sizeName, index } = req.body
    // const result = await cartService.setCartItem({ itemId, sizeId, userId }) //search
    const result = await cartService.setCartItem({ itemId, pId, sizeId, quantity, userId, sizeName, index }) //add
    res.status(200).json(result)
  }),
  // setCartItem: asyncHandler(async (req, res, next) => {
  //   const { userId } = req.payload
  //   const { itemId, pId, sizeId, quantity, sizeName, index } = req.body
  //   // const result = await cartService.setCartItem({ itemId, sizeId, userId }) //search
  //   const result = await cartService.setCartItem({ itemId, pId, sizeId, quantity, userId, sizeName, index }) //add
  //   res.status(200).json(result)
  // }),
  updateItemQuantity: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { itemId, sizeId, value, quantity, index } = req.body

    // const result = await cartService.setCartItem({ itemId, sizeId, userId }) //search
    const result = await cartService.updateItemQuantity({ index, itemId, sizeId, value, userId, quantity }) //add
    // const result = await cartService.getItemByIndex({ index, itemId, sizeId, value, userId, quantity }) //add
    res.status(200).json(result)
  }),
  getItemByIndex: asyncHandler(async (req, res, next) => {
    const { userId } = req.payload
    const { itemId, sizeId, value, quantity, index } = req.body

    const result = await cartService.updateItem({ index, itemId, sizeId, value, userId, quantity }) //add
    res.status(200).json(result)
  }),
})