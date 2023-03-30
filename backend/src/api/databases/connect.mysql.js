const mysql = require('mysql2/promise');
const { handlerPromise } = require('../utils');
const dbConfig = require('../../config/db.config').mysql;

var that = module.exports = {
    pool: mysql.createPool({
        host: dbConfig.HOST,
        user: dbConfig.USER, // 'testuser',
        password: dbConfig.PASSWORD, //'user'
        database: dbConfig.DB,
        port: dbConfig.PORT,
        connectionLimit: dbConfig.LIMIT_CONNECT
    }),

    getConnection: async (callback) => {
        return that.pool.getConnection().then(conn => {
            const promise = callback();
            conn.release();
            return promise;
        })
    },

    testConnection: async () => {
        await that.pool.query('select 1').then((record, fields) => {
            console.log('MySQL:::Connected');
        }).catch(e => {
            console.log('Error:::MySQL is not Connected')
        })
    },

}