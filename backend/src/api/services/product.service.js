const createHttpError = require('http-errors')
const nanoid = require('../utils/nanoid')
const cloudinaryModel = require('../models/cloudinary.model')
const productDao = require('../daos/product.dao').getDB('mysql')
const redisProductDao = require('../daos/product.dao').getDB('redis')
const redis = require('../databases/connect.redis.v2')

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
    const offset = ((page ?? 1) - 1) * itemPerPage
    const { count, products } = await redisProductDao.getProductsByCategoryIDs({
      ...rest,
      offset,
      limit: itemPerPage,
    })

    return {
      total: count,
      data: products,
      meta: {
        page,
        itemPerPage,
      },
    }
  },

  getProducts: async (page) => {
    const { count, products } = await redisProductDao.getProducts({
      limit: itemPerPage,
      offset: itemPerPage * ((page ?? 1) - 1),
    })

    return {
      total: count,
      data: products,
      meta: {
        page: page ?? 1,
        itemPerPage,
      },
    }
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
    const affectedRows = await productDao.uploadImg(item)
    if (affectedRows) {
      redisProductDao.uploadImg(item).then(() => console.log(`redis upload ${pId} ok`))
    }
    return affectedRows
  },
  findBySlug: async (slug) => {
    return await redisProductDao.findBySlug(slug)
  },
  findRelatedProducts: async (slug) => {
    return await redisProductDao.findRelatedProducts(slug)
  },
})
// `
// eval 'local categoryId = redis.call("FT.SEARCH", "products", "@slug:{ao\\-thun\\-nu\\-croptop\\-in\\-hinh\\-con\\-gai}", "RETURN", 1, "category_id" )[3][2] local results= redis.call("FT.SEARCH", "products", "@category_id:{"..categoryId.."}") local filteredResults = {}
// for i, val in ipairs(results) do
// if i % 2 ~= 0 then table.insert(filteredResults, val)
// end
// end
// return filteredResults' 0
// eval 'local categoryId = redis.call("FT.SEARCH", "products", "@slug:{"..ARGV"}", "RETURN", 1, "category_id" )[3][2] local results= redis.call("FT.SEARCH", "products", "@category_id:{"..categoryId.."}") local filteredResults = {}
// for i, val in ipairs(results) do
// if i % 2 ~= 0 then table.insert(filteredResults, val)
// end
// end
// return filteredResults' 0
// `
