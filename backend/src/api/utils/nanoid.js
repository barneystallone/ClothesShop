const { customAlphabet } = require('nanoid/async');

const customStr = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nanoid = customAlphabet(customStr, 10)

module.exports = nanoid