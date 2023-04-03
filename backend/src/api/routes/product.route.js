const express = require('express');
const { pool } = require('../databases/connect.mysql');
const productController = require('../controllers/product.controller');
const routes = express.Router();

routes.get('/', productController.getAllProduct)
routes.post('/create', productController.insertProduct) // auth admin

module.exports = routes;