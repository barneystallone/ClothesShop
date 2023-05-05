const express = require('express')
const { auth } = require('../middleware/auth')
const routes = express.Router()

routes.use('/product', require('./product.route'))
routes.use('/category', require('./category.route'))
routes.use('/user', require('./user.route'))
routes.use('/cart', require('./cart.route'))

module.exports = routes
