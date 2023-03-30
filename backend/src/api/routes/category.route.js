const express = require('express');
const { asyncHandler } = require('../middleware');
<<<<<<< HEAD
const Category = require('../databases/category.model');
=======
const Category = require('../models/category.model');
>>>>>>> c18c934 ([BE] Api get category)
const { pool } = require('../databases/connect.mysql');
const { getCategories } = require('../controllers/category.controller');
const routes = express.Router();

routes.get('/', getCategories)

module.exports = routes;


