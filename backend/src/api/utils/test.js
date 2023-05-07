const qs = require('qs')

const ids = ['c08', 'c09', 'c30', 'c20']
const sortedIds = ids.sort()
const queryString = qs.stringify({ ids: sortedIds.join('|') })
console.log(queryString)

const idsStr = 'ids=c08%7Cc09%7Cc20%7Cc30&page=9'
const parse = qs.parse('p=2&%C3%A1das=2')
console.log(parse)
