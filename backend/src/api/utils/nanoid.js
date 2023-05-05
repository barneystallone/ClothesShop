const { customAlphabet } = require('nanoid/async')

const customStr = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nanoid = customAlphabet(customStr)

module.exports = nanoid
