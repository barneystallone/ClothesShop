const express = require('express')
// const { pool } = require('../databases/connect.mysql')
const productController = require('../controllers/product.controller')
const { uploader } = require('../middleware/uploader')
const routes = express.Router()

routes.get('/', productController.getAllProduct)
routes.get('/search', productController.searchProduct)
routes.get('/suggest', productController.getAutoSuggest)
routes.post('/', productController.insertProduct) // autuploadImagesh admin
routes.get('/:slug', productController.findBySlug)
routes.get('/related/:slug', productController.getRelatedProducts)
routes.post('/upload/:pId', uploader.fields([{ name: 'img' }, { name: 'thumbImg' }]), productController.upload) // auth admin

module.exports = routes
