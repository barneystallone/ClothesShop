const createHttpError = require('http-errors');
const mysql = require('../../../databases/connect.mysql');

var self = module.exports = {
    create: async ({ pId, title, slug, description, price, category_id }) => {
        const sql = "insert into product value (?,?,?,?,?,0,?)"

        const params = [pId, title, slug, description, price, category_id]

        return await mysql.pool.execute(sql, params)
            .then(res => res[0].affectedRows)
            .catch((err) => {
                if (err.code) {
                    throw createHttpError.InternalServerError(err.code)
                }
                throw createHttpError.InternalServerError(err.sqlMessage)
            })


    },
    isExist: async ({ slug, id }) => {
        const sql = "select count(*) from product where slug = ? or id = ?"

        const isExist = await mysql.pool.execute(sql, [slug])
            .then(res => res[0])
        return isExist ? isExist : 0
    },
    findBySlug: async (slug) => {


    },
    getProducts: async (options) => {
        if (options?.limit && options?.offset) {
            return;
        }
        const sql = 'Select * from product';
        return await mysql.pool.execute(sql).then(res => res[0])
    },
}