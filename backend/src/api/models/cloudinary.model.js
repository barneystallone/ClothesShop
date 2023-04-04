const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

var self = module.exports = {
    uploadFile: (filePath) => {
        const options = {
            folder: process.env.CLOUD_PRODUCT_FOLDER,
        }
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(filePath, options)
                .then(result => {
                    if (result) {
                        resolve({
                            url: result.secure_url
                        });
                        require('fs').unlink(filePath, (err) => {
                            if (err) {
                                console.log(`Không thể xóa file ${filePath}`);
                            }
                        })
                    }
                })
        })
    }
}

