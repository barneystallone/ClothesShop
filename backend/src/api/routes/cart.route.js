const express = require('express')
const routes = express.Router()
const cartController = require('../controllers/cart.controller')
const { verifyToken } = require('../services/jwt.service')

routes.get('/', [verifyToken], cartController.getCart)
routes.put('/sync', [verifyToken], cartController.syncCartToDB)
routes.put('/item', [verifyToken], cartController.setCartItem)
routes.patch('/item', [verifyToken], cartController.setCartItem)
routes.put('/item-quantity', [verifyToken], cartController.updateItemQuantity)
routes.patch('/item-quantity', [verifyToken], cartController.updateItemQuantity)

module.exports = routes
