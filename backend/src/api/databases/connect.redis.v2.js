const Redis = require('ioredis')
const redis = new Redis(require('../../config/db.config').redis.URL)
redis.on('connect', () => console.log(`Redis:::connected`))
redis.on('error', (error) => console.error(`Redis:::${error}`))

module.exports = redis
