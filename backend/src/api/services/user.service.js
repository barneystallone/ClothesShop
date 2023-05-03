const userDao = require('../daos/user.dao').getDB('mysql')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { generateAccessToken, generateRefreshToken } = require('./jwt.service')

var self = (module.exports = {
  register: async ({ email, password, userId }) => {
    const isExist = await userDao.isExistsEmail(email)
    if (isExist) {
      throw createError.Conflict(`Email ${email} đã được đăng ký`)
    }

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    const _user = await userDao.insertUser({ email, password, userId })
    console.log(_user)
    return _user
  },

  login: async ({ email, password }) => {
    const _user = await userDao.findByEmail(email)
    if (!_user) {
      throw createError.NotFound(`Email chưa được đăng ký`)
    }

    const isValidPassword = await bcrypt.compare(password, _user.password)

    if (!isValidPassword) {
      throw createError.NotFound('Sai tên đăng nhập hoặc mật khẩu')
    }
    const payload = {
      userId: _user.id,
      roleName: _user.role_name,
    }
    const [accessToken, refreshToken] = await Promise.all([generateAccessToken(payload), generateRefreshToken(payload)])

    return {
      accessToken,
      refreshToken,
      userEmail: _user.email,
      userId: _user.id,
    }
  },

  findById: async (userId) => {
    const user = await userDao.findById(userId)
    //  có id rồi mới lấy ra user
    if (!user) {
      throw createError.NotFound(`Không tìm thấy user có id là ${userId}`)
    }
    return { userEmail: user.email, userId: user.id }
  },
})
