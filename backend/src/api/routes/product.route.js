const express = require('express');
const { pool } = require('../databases/connect.mysql');
const routes = express.Router();

routes.get('/', async (req, res, next) => {
    const records = await pool.query('select 1');
    res.json(records[0])
})

module.exports = routes;