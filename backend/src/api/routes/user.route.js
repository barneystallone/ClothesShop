const routes = require('express').Router();
const userController = require('../controllers/user.controller');
const { verifyRefreshToken } = require('../services/jwt.service');

routes.post('/register', userController.register)
routes.post('/refresh-token', [verifyRefreshToken], userController.refreshToken)
routes.post('/login', userController.login)

module.exports = routes;