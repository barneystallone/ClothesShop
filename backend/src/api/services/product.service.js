const createHttpError = require('http-errors')
const nanoid = require('../utils/nanoid')
const cloudinaryModel = require('../models/cloudinary.model')
const productDao = require('../daos/product.dao').getDB('mysql')

var self = (module.exports = {
  insertProduct: async ({ pId, title, slug, description, price, category_id }) => {
    const model = { pId, title, slug, description, price, category_id }
    const affectedRows = await productDao.create(model)
    return affectedRows
  },

  getAllProducts: async () => {
    return await productDao.getProducts()
  },

  /**
   * Upload và insert các màu khác nhau cho sản phẩm
   * @returns affectedRows: số row được thêm vào
   */
  upload: async ({ pId, colorName, colorCode, img, thumbImg }) => {
    const isExistsItem = await productDao.isExistsItem({ pId, colorCode })
    if (isExistsItem) {
      throw createHttpError.Conflict('Item đã tồn tại')
    }
    const _arrPromise = [img, thumbImg].map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinaryModel.uploadFile(file[0].path).then((result) => {
            resolve(result.url)
          })
        })
    )
    _arrPromise.push(nanoid(10).then((id) => `N6i${id}`))
    const [url, thumbUrl, itemId] = await Promise.all(_arrPromise)
    console.log('img::', url)
    console.log('thumb::', thumbUrl)
    const item = {
      pId,
      colorName,
      colorCode,
      url,
      thumbUrl,
      itemId,
    }
    return await productDao.uploadImgAndInsertItem(item)
  },
})
