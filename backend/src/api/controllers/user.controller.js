const createHttpError = require('http-errors')
const { asyncHandler } = require('../middleware')
const userService = require('../services/user.service')
const { userValidate } = require('../utils')
const jwtService = require('../services/jwt.service')

var self = (module.exports = {
  register: asyncHandler(async (req, res, next) => {
    const { error } = userValidate(req.body)
    if (error) {
      throw createHttpError(error.details[0].message)
    }
    const { email, password } = req.body

    const insertId = await userService.register({ email, password })

    res.status(200).json({
      status: 'Success',
      insertId,
    })
  }),

  login: asyncHandler(async (req, res, next) => {
    const { error } = userValidate(req.body)
    if (error) {
      throw createHttpError.BadRequest(error.details[0].message)
    }
    const { email, password } = req.body

    const { accessToken, refreshToken, userId, userEmail } = await userService.login({ email, password })

    self.storeRefreshTokenInCookie(res)(refreshToken)

    res.status(200).json({
      userId,
      userEmail,
      accessToken,
    })
  }),

  refreshToken: asyncHandler(async (req, res, next) => {
    const { accessToken, refreshToken } = await jwtService.refreshToken(req.payload)

    self.storeRefreshTokenInCookie(res)(refreshToken)

    res.json({
      accessToken,
    })
  }),

  storeRefreshTokenInCookie: (res) => (token) => {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    })
  },
})
