const createError = require('http-errors')
const redisClient = require('./api/databases/init.redis');

const express = require('express');
const app = express();
const compression = require('compression');
app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        return req.headers['x-no-compress'] ? false : compression.filter(req, res)
    }
}));



app.use(express.json());

app.use('/api', require('./api/routes'))

// ============ handle error mw
app.use((req, res, next) => {
    next(createError(404, 'Not Found!'));
})

app.use((err, req, res, next) => {
    err.status = err.status || 500
    res.status(err.status).json({
        status: err.status,
        message: err.message
    })
})
// ============ end handle error mw

module.exports = app