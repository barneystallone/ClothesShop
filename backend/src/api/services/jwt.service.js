const createHttpError = require('http-errors')
const JWT = require('jsonwebtoken')
const redisClient = require('../databases/connect.redis.v2')
const { ACCESS_KEY_SECRET, REFRESH_KEY_SECRET } = process.env

var self = (module.exports = {
  generateAccessToken: async ({ userId, roleName }) => {
    return new Promise((resolve, reject) => {
      const secretKey = ACCESS_KEY_SECRET
      const payload = {
        userId,
        roleName,
      }
      const options = {
        expiresIn: '1m',
      }

      JWT.sign(payload, secretKey, options, (err, token) => {
        err ? reject(err) : resolve(token)
      })
    })
  },

  verifyToken: (req, res, next) => {
    if (!req.headers['authorization']) {
      return next(createHttpError.Unauthorized())
    }

    const token = req.headers['authorization'].split(' ')[1]
    JWT.verify(token, ACCESS_KEY_SECRET, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(createHttpError(err.message))
        }
        return next(createHttpError.Unauthorized())
      }

      req.payload = payload // userId, roleName
      next()
    })
  },

  generateRefreshToken: async ({ userId, roleName }) => {
    return new Promise((resolve, reject) => {
      const secretKey = REFRESH_KEY_SECRET
      const payload = {
        userId,
        roleName,
      }
      const options = {
        expiresIn: '30d',
      }

      JWT.sign(payload, secretKey, options, (err, token) => {
        if (err) reject(err)
        redisClient
          .set(`refreshToken:${userId}`, token, 'EX', 30 * 24 * 3600)
          .catch((err) => reject(createHttpError.InternalServerError()))

        resolve(token)
      })
    })
  },
  verifyRefreshToken: (req, res, next) => {
    const { refreshToken } = req.cookies
    console.log({ refreshToken })
    if (!refreshToken) {
      return next(createHttpError.Unauthorized())
    }

    JWT.verify(refreshToken, REFRESH_KEY_SECRET, (err, payload) => {
      if (err) {
        return next(createHttpError.Forbidden('Token không hợp lệ'))
      }
      redisClient
        .get(`refreshToken:${payload.userId}`)
        .then((token) => {
          if (refreshToken === token) {
            req.payload = payload
            return next()
          }
          return next(createHttpError.Conflict('Token không khớp'))
        })
        .catch((err) => next(createHttpError.InternalServerError('Error:::Redis server')))
    })
  },

  refreshToken: async ({ userId, roleName }) => {
    const [accessToken, refreshToken] = await Promise.all([
      self.generateAccessToken({ userId, roleName }),
      self.generateRefreshToken({ userId, roleName }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  },
})
