const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const userService = require('../services/user.service')
const { userValidate } = require('../utils')
const jwtService = require('../services/jwt.service')
const nanoid = require('../utils/nanoid')

var self = (module.exports = {
  register: asyncHandler(async (req, res, next) => {
    const { error } = userValidate(req.body)
    if (error) {
      throw createHttpError(error.details[0].message)
    }
    const { email, password } = req.body
    const userId = 'N6_' + (await nanoid(12))
    const affectedRows = await userService.register({ email, password, userId })

    res.status(200).json({
      affectedRows,
    })
  }),

  login: asyncHandler(async (req, res, next) => {
    const { error } = userValidate(req.body)
    if (error) {
      throw createHttpError.BadRequest(error.details[0].message)
    }
    const { email, password } = req.body

    const { accessToken, refreshToken, userId, userEmail } = await userService.login({ email, password })

    if (refreshToken) self.storeRefreshTokenInCookie(res)(refreshToken)

    res.status(200).json({
      userId,
      userEmail,
      accessToken,
    })
  }),

  refreshToken: asyncHandler(async (req, res, next) => {
    console.log('path:::', req.route.path)
    console.log('payload:::', req.payload)
    if (req.route.path === '/refresh') {
      const promiseArr = []

      promiseArr.push(userService.findById(req.payload.userId))
      promiseArr.push(jwtService.refreshToken(req.payload))
      const [{ userId, userEmail }, { accessToken, refreshToken }] = await Promise.all(promiseArr)
      self.storeRefreshTokenInCookie(res)(refreshToken)

      return res.json({
        accessToken,
        userId,
        userEmail,
      })
    }
    const { accessToken, refreshToken } = await jwtService.refreshToken(req.payload)

    self.storeRefreshTokenInCookie(res)(refreshToken)

    res.json({
      accessToken,
    })
  }),

  storeRefreshTokenInCookie: (res) => (token) => {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: true, // chạy web ->  true, postman: flase
      path: '/',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 30,
    })
  },
})
