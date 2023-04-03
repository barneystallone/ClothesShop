const createError = require('http-errors')
const express = require('express');
const cors = require('cors');
const redisClient = require('./api/databases/connect.redis');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const compression = require('compression');

const app = express();

app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        return req.headers['x-no-compress'] ? false : compression.filter(req, res)
    }
}));

app.use(cors({
    origin: [/https?:\/\/localhost:3000/]
}))

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'))

app.use('/api', require('./api/routes'))

// ============ handle error mw
app.use((req, res, next) => {
    next(createError(404, 'Not Found!'));
})

app.use((err, req, res, next) => {
    // console.log(err.message);
    err.status = err.status || 500
    res.status(err.status).json({
        status: err.status,
        message: err.message
    })
})
// ============ end handle error mw

module.exports = app