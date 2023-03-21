require('dotenv').config();

module.exports = {
    mysql: {
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        DB: process.env.MYSQL_DB_NAME,
        PORT: process.env.MYSQL_PORT
    },

    redis: {
        PASSWORD: process.env.REDIS_PASSWORD,
        SOCKET: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    },
}