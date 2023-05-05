const qs = require('qs')

const ids = ['c08', 'c09', 'c30', 'c20']
const sortedIds = ids.sort()
const queryString = qs.stringify({ ids: sortedIds.join('|') })

console.log(queryString)
