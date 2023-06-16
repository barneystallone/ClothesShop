const redis = require('../../../databases/connect.redis.v2')
const { getRelatedProductsScript } = require('./scripts/getRelatedProducts')
const SEARCH_INDEX = 'products'
const SUGGEST_DICTIONARY_NAME = 'autocomplete'
const limitSuggest = process.env.LIMIT_SUGGEST
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
  // uploadImg: async ({ pId, url, thumbUrl }) => {
  //   // prettier-ignore
  //   return await redis.call(
  //       'JSON.ARRAPPEND', `${PREFIX}${pId}`, '$.img',
  //       JSON.stringify({ url, thumbUrl }))
  // },

  /**
   * @example ft.search products '@category_id:{c10\\|c30\\|c15\\|c14}' DIALECT 3 RETURN 11
   * pId title price slug sold $.collections[*].url as url $.collections[*].thumbUrl as thumbUrl LIMIT 0 10
   */
  getProducts: async ({ keyword, strListId, limit = 20, offset = 0 }) => {
    let queryString = ''
    if (keyword) queryString += `@title:(${keyword}|${keyword.concat('*')}) `
    if (strListId) queryString += `@category_id:{${strListId}}`
    if (!queryString) queryString = '*'
    // let queryString = strListId ? `@category_id:{${strListId}}` : '*'
    //prettier-ignore
    return self.getProductsHandler(redis
      .call(
        'FT.SEARCH', SEARCH_INDEX, queryString , 'DIALECT', 3, 'RETURN', 7, 
        'pId', 'title', 'price', 'slug', 'sold', 'url', 'thumbUrl',
        'LIMIT', offset, limit
      ))
  },

  // EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 "product:*"
  putProducts: async (data) => {
    const pipeline = redis.pipeline()

    pipeline.call('EVAL', "return redis.call('del', unpack(redis.call('keys', ARGV[1])))", 0, 'product:*')
    data.forEach((item) => {
      pipeline.call('JSON.SET', `product:${item.pId}`, '$', JSON.stringify(item))
    })

    return await pipeline.exec()
  },

  addSuggestions: async (listKeywords) => {
    const pipeline = redis.pipeline()
    listKeywords.forEach((keyword) => pipeline.call('FT.SUGADD', SUGGEST_DICTIONARY_NAME, keyword, 1))
    return pipeline.exec()
  },

  getProductsHandler: (promise, isDialect3 = true) => {
    return promise.then(([total, ...rest]) => {
      //prettier-ignore
      return {
        total,
        products: rest.filter((_, index) => index % 2 !== 0).map((arr) => {
          return arr?.reduce((product, key, index) => {
            if (index % 2 === 0) {
              if(isDialect3){
                if(key === 'url' || key === 'thumbUrl') {
                  product[key] = JSON.parse(arr[index + 1])
                  return product
                }
                product[key] = JSON.parse(arr[index + 1])[0]
              } else product[key] = arr[index + 1]
            }
            return product
          }, {})
        }),
      }
    })
  },

  findBySlug: async (slug) => {
    const query = `@slug:{${slug.replace(/-/g, '\\-')}}`
    return await redis.call('FT.SEARCH', SEARCH_INDEX, query).then(([count, ...prodKeysAndValues]) => {
      let productWrap = prodKeysAndValues
        .filter((_, index) => index % 2 !== 0)
        .map((productArray) => {
          return JSON.parse(productArray[1])
        })
      return { count, product: productWrap[0] }
    })
  },

  getSearchProducts: async ({ keyword, limit = 10, offset = 0 }) => {
    // prettier-ignore
    return self.getProductsHandler(redis.call(
      'FT.SEARCH', SEARCH_INDEX, `@title:${keyword}|${keyword.concat('*')}`,
      'RETURN', 5,
      'pId', 'title', 'price', 'slug', 'url',
      'HIGHLIGHT', 'FIELDS','1' ,'title',
      'DIALECT', 2,
      'LIMIT', offset, limit
    ),  false)
  },

  /**
   * @returns Danh sách các title đề xuất
   */
  getAutoSuggest: async ({ keyword }) => {
    // prettier-ignore
    return redis.call(
      'FT.SUGGET', SUGGEST_DICTIONARY_NAME, keyword,'FUZZY' ,'MAX' ,limitSuggest
    )
  },

  getRelatedProducts: async (slug) => {
    const _slug = slug.replace(/-/g, '\\-')
    const limit = 5

    return self.getProductsHandler(redis.getRelatedProducts(0, _slug, limit))
  },
  init: async () => {
    let indices = await redis.call('FT._list')
    let pipeline = redis.pipeline()
    if (indices.includes(SEARCH_INDEX)) {
      await redis.call('FT.DROPINDEX', SEARCH_INDEX)
    }
    redis.defineCommand('getRelatedProducts', {
      lua: getRelatedProductsScript(),
    })
    // prettier-ignore
    await pipeline.call(
      'FT.CREATE', SEARCH_INDEX,
      'ON', 'JSON',
      'PREFIX', 1, PREFIX,
      'SCHEMA',
        '$.slug','as','slug', 'TAG',
        '$.price','as','price', 'NUMERIC', 'SORTABLE',
        '$.description','as','description', 'TEXT',
        '$.category_id','as','category_id', 'TAG',
        '$.title','as', 'title', 'TEXT','WEIGHT','2.0','SORTABLE',
        '$.pId','as','pId', 'TAG', 'SORTABLE',
        '$.sold','as','sold','NUMERIC', 'SORTABLE',
        '$.collections[*].itemId','as','itemId','TAG', 'SORTABLE',
        '$.collections[*].url','as','url','TAG', 'SORTABLE',
        '$.collections[*].thumbUrl','as','thumbUrl','TAG', 'SORTABLE',
    ).call('DEL', SUGGEST_DICTIONARY_NAME).exec()
    // ).exec()
  },
})
