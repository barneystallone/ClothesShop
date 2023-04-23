const createHttpError = require('http-errors')
const mysql = require('../../../databases/connect.mysql')

var self = (module.exports = {
  create: async ({ pId, title, slug, description, price, category_id }) => {
    const sql = 'insert into product value (?,?,?,?,?,0,?)'

    const params = [pId, title, slug, description, price, category_id]

    return await mysql.pool
      .execute(sql, params)
      .then((res) => res[0].affectedRows)
      .catch((err) => {
        if (err.code) {
          throw createHttpError.InternalServerError(err.code)
        }
        throw createHttpError.InternalServerError(err.sqlMessage)
      })
  },
  isExist: async ({ slug, id }) => {
    const sql = 'select count(*)  from product where slug = ? or id = ?'

    const isExist = await mysql.pool.execute(sql, [slug]).then((res) => res[0])
    return isExist
  },
  isExistsItem: async ({ colorCode, pId }) => {
    const sql = 'select count(*) c from item where colorCode = ? and pId = ?'

    const isExistsItem = await mysql.pool.execute(sql, [colorCode, pId]).then((res) => res[0][0].c)
    return isExistsItem
  },
  findBySlug: async (slug) => {},
  getProducts: async (options) => {
    if (options?.limit && options?.offset) {
      return
    }
    const sql = 'Call  proc_getProducts()'
    return await mysql.pool.execute(sql).then((res) => res[0])
  },
  uploadImgAndInsertItem: async ({ itemId, pId, url, thumbUrl, colorName, colorCode }) => {
    const sql = 'insert into  item values (?,?,?,?,?,?)'
    const params = [itemId, pId, url, thumbUrl, colorName, colorCode]
    return await mysql.pool.execute(sql, params).then((res) => res[0].affectedRows)
  },
})
