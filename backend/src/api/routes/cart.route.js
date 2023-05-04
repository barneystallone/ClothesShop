const express = require('express')
const routes = express.Router()
const cartController = require('../controllers/cart.controller')
const { verifyToken } = require('../services/jwt.service')

routes.get('/', [verifyToken], cartController.getCart)
// routes.put('/', [verifyToken], cartController.setCart)
routes.put('/item', [verifyToken], cartController.setCartItem)
routes.patch('/item', [verifyToken], cartController.getItemByIndex)
// routes.patch('/item', [verifyToken], cartController.updateItemQuantity)

module.exports = routes
