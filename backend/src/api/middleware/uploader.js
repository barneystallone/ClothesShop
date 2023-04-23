const multer = require('multer');
const path = require('path');
const nanoid = require('../utils/nanoid');


const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../../public/images'));
    },

    filename: (req, file, callback) => {
        nanoid(5).then(uniqueId => callback(null, `${uniqueId}_${file.originalname}`))
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
        return;
    }
    callback(new Error('Chỉ hỗ trợ định dạng image'), false)
}


const uploader = multer({
    storage: multerStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 } // 1 MB
})

module.exports = { uploader }