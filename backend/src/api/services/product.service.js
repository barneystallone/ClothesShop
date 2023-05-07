const createHttpError = require('http-errors')
const nanoid = require('../utils/nanoid')
const cloudinaryModel = require('../models/cloudinary.model')
const productDao = require('../daos/product.dao').getDB('mysql')
const redisProductDao = require('../daos/product.dao').getDB('redis')

// JSON.GET product:N6pZN2uM8x0YZ '$.collections[*].inventory[?(@.sizeId=="S001")]
const itemPerPage = process.env.ITEM_PER_PAGE * 1
var self = (module.exports = {
  init: async () => {
    redisProductDao.init().then(() => ({}))
    const data = await productDao.getProducts()
    redisProductDao.putProducts(data).then(() => console.log('cached products ok'))
  },

  insertProduct: async ({ pId, title, slug, description, price, category_id }) => {
    const model = { pId, title, slug, description, price, category_id }
    const affectedRows = await productDao.create(model)
    if (affectedRows) {
      redisProductDao.create(model).then((res) => console.log(`Redis insertProduct ${pId}::`, res))
    }

    return affectedRows
  },

  getProductsByCategoryIDs: async (params) => {
    const { page, ...rest } = params
    const _offset = ((page ?? 1) - 1) * itemPerPage
    const { total, products } = await redisProductDao.getProductsByCategoryIDs({
      ...rest,
      offset: _offset,
      limit: itemPerPage,
    })

    return {
      total,
      products,
      itemPerPage,
      meta: {
        page,
      },
    }
  },

  getProducts: async (page) => {
    const { total, products } = await redisProductDao.getProducts({
      limit: itemPerPage,
      offset: itemPerPage * ((page ?? 1) - 1),
    })

    return {
      total,
      products,
      itemPerPage,
      meta: {
        page: page ?? 1,
      },
    }
  },

  /**
   * Upload và insert các màu khác nhau cho sản phẩm
   * @returns affectedRows: số row được thêm vào
   */
  upload: async ({ pId, colorName, colorCode, img, thumbImg }) => {
    const _isExistsItem = await productDao.isExistsItem({ pId, colorCode })
    if (_isExistsItem) {
      throw createHttpError.Conflict(`Màu ${colorName}(${colorCode}) đã tồn tại`)
    }
    const _arrPromise = [img, thumbImg].map(
      (file) =>
        new Promise((resolve) => {
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
    // const affectedRows = await productDao.uploadImg(item)
    // if (affectedRows) {
    //   redisProductDao
    //     .uploadImg(item)
    //     .then(() => console.log(`redis upload ${pId} ok`))
    //     .catch((e) => {
    //       console.trace('redis err::', e.message)
    //     })
    // }
    productDao.uploadImg(item).then((res) => console.log(res))
    return { url, thumbUrl }
  },
  findBySlug: async (slug) => {
    return await redisProductDao.findBySlug(slug)
  },
  getRelatedProducts: async (slug) => {
    return await redisProductDao.getRelatedProducts(slug)
  },
})
