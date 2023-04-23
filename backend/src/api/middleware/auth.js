const createHttpError = require("http-errors");
const { verifyToken } = require("../services/jwt.service");

const auth = whiteList => (req, res, next) => {
    console.log(req.payload);
    const { roleName } = req.payload;
    if (!roleName) return next(createHttpError.Unauthorized());
    if (!whiteList.includes(roleName)) {
        return next(createHttpError('Bạn không có quyền truy cập'))
    }

    next();
}

module.exports = {
    auth
}