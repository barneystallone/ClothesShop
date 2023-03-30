const mysql = require('mysql2/promise');
<<<<<<< HEAD
const dbConfig = require('../../config/db.config').mysql;

const pool = mysql.createPool({
    host: dbConfig.HOST, //'localhost',
    user: dbConfig.USER, // 'testuser',
    password: dbConfig.PASSWORD, //'user'
    database: dbConfig.DB,
    port: dbConfig.PORT,
    connectionLimit: 10
});
pool.getConnection()
    .then(conn => {
        console.log('MySQL:::Connected')
        conn.release();
    })
    .catch(e => console.log("Error:::MySQL is not Connected"))


var that = module.exports = {
    pool: pool,
=======
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
>>>>>>> c18c934 ([BE] Api get category)

    getConnection: async (callback) => {
        return that.pool.getConnection().then(conn => {
            const promise = callback();
            conn.release();
            return promise;
        })
    },

<<<<<<< HEAD
}
process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
})
=======
    testConnection: async () => {
        await that.pool.query('select 1').then((record, fields) => {
            console.log('MySQL:::Connected');
        }).catch(e => {
            console.log('Error:::MySQL is not Connected')
        })
    },

}
>>>>>>> c18c934 ([BE] Api get category)
