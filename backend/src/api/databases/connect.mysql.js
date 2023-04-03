const mysql = require('mysql2/promise');
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

    getConnection: async (callback) => {
        return that.pool.getConnection().then(conn => {
            const promise = callback();
            conn.release();
            return promise;
        })
    },

}
process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
})
