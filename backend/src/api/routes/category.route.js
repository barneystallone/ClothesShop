const express = require('express')
// const { asyncHandler } = require('../middleware')
// const Category = require('../databases/category.model')
// const { pool } = require('../databases/connect.mysql')
const { getCategories } = require('../controllers/category.controller')
const routes = express.Router()

routes.get('/', getCategories)

module.exports = routes
