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



var self = module.exports = {
    getNewClient: () => {
        const redisClient = redis.createClient({
            password: redisConfig.PASSWORD,
            socket: redisConfig.SOCKET
        });
        self.getConnection(redisClient);

        return redisClient;
    },

    getConnection: async (redisClient) => {
        redisClient.on("connect", () => console.log(`Redis::: connected`));
        redisClient.on("error", (error) => console.error(`Redis::: ${error}`));
        await redisClient.connect();
    },

    getClient: () => {
        return redisClient;
    }
}

// https://github.com/redis/node-redis/blob/master/README.md#redis-commands
// Build in func
//  check status redisClient.isOpen,
//  exists, set, get,...