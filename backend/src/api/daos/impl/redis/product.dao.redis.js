const redis = require('../../../databases/connect.redis.v2')
const { getRelatedProductsScript } = require('./scripts/getRelatedProducts')
const SEARCH_INDEX = 'products'
const PREFIX = 'product:'
var self = (module.exports = {
  create: async ({ pId, title, slug, description, price, category_id }) => {
    // prettier-ignore
    return await redis.call(
      'JSON.SET', `${PREFIX}${pId}`,'$',
      JSON.stringify({
        pId,
        title,
        slug,
        description,
        price,
        category_id,
        img: []
      })
    )
  },
  uploadImg: async ({ pId, url, thumbUrl }) => {
    // prettier-ignore
    return await redis.call(
        'JSON.ARRAPPEND', `${PREFIX}${pId}`, '$.img', 
        JSON.stringify({ url, thumbUrl }))
  },
  getProducts: async ({ limit = 20, offset = 0 }) => {
    // return await redis.call('FT.SEARCH', SEARCH_INDEX, '*', 'LIMIT', offset, limit)
    return redis
      .call(
        'FT.SEARCH',
        SEARCH_INDEX,
        '*',
        'RETURN',
        8,
        'pId',
        'title',
        'price',
        'slug',
        'sold',
        '$.img',
        'as',
        'img',
        'LIMIT',
        offset,
        limit
      )
      .then(([total, ...rest]) => {
        // console.log([_ ,...rest ])
        //prettier-ignore
        return {
          total,
          products: rest.filter((_, index) => index % 2 !== 0).map((arr) => {
            // console.log('arr::',arr);
              return arr?.reduce((product, key, index) => {
                if (index % 2 === 0) {
                  if(key === 'img') {
                    product[key] = JSON.parse(arr[index + 1])
                    return product
                  }
                  product[key] = arr[index + 1]
                }
                return product
              }, {})
            }),
        }
      })
  },
  putProducts: async (data) => {
    const pipeline = redis.pipeline()
    // EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 "product:*"
    pipeline.call('EVAL', "return redis.call('del', unpack(redis.call('keys', ARGV[1])))", 0, 'product:*')
    data.forEach((item) => {
      pipeline.call('JSON.SET', `product:${item.pId}`, '$', JSON.stringify(item))
    })

    return await pipeline.exec()
  },
  getProductsByCategoryIDs: async ({ strListId, limit = 20, offset = 0 }) => {
    // const categories = listId.map((item) => item).join('|')
    return self.getProductsHandler(
      redis.call('FT.SEARCH', SEARCH_INDEX, `@category_id:{${strListId}}`, 'LIMIT', offset, limit)
    )
  },
  getProductsHandler: (promise) => {
    return promise.then(([count, ...prodKeysAndValues]) => {
      let products = prodKeysAndValues
        .filter((_, index) => index % 2 !== 0)
        .map((productArray) => {
          return JSON.parse(productArray[1])
        })
      return { count, products }
    })
  },
  findBySlug: async (slug) => {
    const query = `@slug:{${slug.replace(/-/g, '\\-')}}`
    return await self.getProductsHandler(redis.call('FT.SEARCH', SEARCH_INDEX, query)).then(({ _, products }) => ({
      product: products[0],
    }))
  },
  getRelatedProducts: async (slug) => {
    const _slug = slug.replace(/-/g, '\\-')
    const limit = 5

    return await redis.getRelatedProducts(0, _slug, limit).then(([_, ...rest]) => {
      // console.log([_ ,...rest ])
      //prettier-ignore
      return {
        products: rest.filter((_, index) => index % 2 !== 0).map((arr) => {
          // console.log('arr::',arr);
            return arr?.reduce((product, key, index) => {
              if (index % 2 === 0) {
                if(key === 'img') {
                  product[key] = JSON.parse(arr[index + 1])
                  return product
                }
                product[key] = arr[index + 1]
              }
              return product
            }, {})
          }),
      }
    })
    // const res = await redis.call('EVAL', scripts, 0, _slug).then((res) => res.map((arr) => JSON.parse(arr[1])))
  },
  init: async () => {
    let indices = await redis.call('FT._list')
    if (indices.includes(SEARCH_INDEX)) {
      await redis.call('FT.DROPINDEX', SEARCH_INDEX)
    }
    redis.defineCommand('getRelatedProducts', {
      lua: getRelatedProductsScript(),
    })
    // prettier-ignore
    await redis.call(
      'FT.CREATE', SEARCH_INDEX,
      'ON', 'JSON',
      'PREFIX', 1, PREFIX,
      'SCHEMA',
        '$.slug','as','slug', 'TAG',
        '$.price','as','price', 'NUMERIC', 'SORTABLE',
        '$.description','as','description', 'TEXT',
        '$.category_id','as','category_id', 'TAG',
        '$.title','as', 'title', 'TEXT', 'SORTABLE',
        '$.pId','as','pId', 'TAG', 'SORTABLE',
        '$.sold','as','sold','NUMERIC', 'SORTABLE',
    )
  },
})

// local filteredResults = {}
// for i, val in ipairs(results) do
// if i % 2 ~= 0 then
//   table.insert(filteredResults, val)
// end
// end
// return filteredResults

// function randomSelect(arr, count)
//           local results ={}
//           local rand
//           for i=1, count do
//             rand = math.random(#arr/2)*2
//             table.insert(results,arr[rand])
//             table.insert(results,arr[rand+1])
//             table.remove(arr,rand)
//             table.remove(arr,rand+1)
//           end
//           return results
//         end
