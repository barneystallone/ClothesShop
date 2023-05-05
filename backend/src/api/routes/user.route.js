const routes = require('express').Router()
const userController = require('../controllers/user.controller')
const { auth } = require('../middleware/auth')
const { verifyRefreshToken, verifyToken } = require('../services/jwt.service')

routes.post('/register', userController.register)
routes.get('/refresh-token', [verifyRefreshToken], userController.refreshToken)
routes.get('/refresh', [verifyRefreshToken], userController.refreshToken)
routes.post('/login', userController.login)
routes.get('/', [verifyToken, auth(['Admin'])], userController.login)

module.exports = routes
