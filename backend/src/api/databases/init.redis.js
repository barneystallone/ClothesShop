const redis = require("redis");
const { redis: redisConfig } = require('../../config/db.config')
let redisClient;

(async () => {
    redisClient = redis.createClient({
        password: redisConfig.PASSWORD,
        socket: redisConfig.SOCKET
    });

    redisClient.on("connect", () => console.log(`Redis::: connected`));

    redisClient.on("error", (error) => console.error(`Redis::: ${error}`));

    await redisClient.connect();
})();

module.exports = redisClient