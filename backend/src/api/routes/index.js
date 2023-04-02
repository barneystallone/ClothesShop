const express = require('express');
const routes = express.Router();

routes.use('/product', require('./product.route'))
routes.use('/category', require('./category.route'))
routes.use('/user', require('./user.route'))

module.exports = routes;