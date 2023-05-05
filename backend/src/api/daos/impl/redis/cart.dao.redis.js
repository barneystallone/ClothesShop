const redis = require('../../../databases/connect.redis.v2')
const { getItemInfoScript } = require('./scripts/getCartItemInfo')
const SEARCH_INDEX = 'carts'
const PREFIX = 'cart:'

// const getItemInfoScript = `local collection = "$.collections[?(@.itemId=="N6i5hk4QUALg9")]";local result = redis.call("ft.search" ,"products", "@itemId:{N6i5hk4QUALg9}" ,"return", 7,"title" ,"price" ,"slug" , "$.collections[?(@.itemId==\"N6i5hk4QUALg9\")].url", collection..".thumbUrl",collection..".colorName",collection..".colorCode")[3]; return result`
// const temp = {pId,itemId,sizeId,sizeName,quantity,
//   url,
//   thumbUrl,
//   colorCode,
//   colorName,
//   slug,
//   title,
//   price,
// }
// eval 'local collection = "$.collections[?(@.itemId==\"N6i5hk4QUALg9\")]";local result = redis.call("ft.search" ,"products", "@pId:{N6p3QrpMgzqKd}" ,"return", 7,"title" ,"price" ,"slug" , "$.collections[?(@.itemId==\"N6i5hk4QUALg9\")].url", collection..".thumbUrl",collection..".colorName",collection..".colorCode")[3]; return result' 0
// eval 'return redis.call("ft.search" ,"products", "@pId:{N6p3QrpMgzqKd}" ,"return", 4 ,"title" ,"price" ,"slug" , "$.collections[?(@.itemId==\"N6i5hk4QUALg9\")][\"url\",\"thumbUrl\",\"colorCode\",\"colorName\"]")' 0
// eval 'return cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}" ,"return", 1, "$.products[*].pId", "DIALECT",3 )[3][2])' 0 "N6_nPuq6oSnY9DO"
// eval 'local result = cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}", "return", 1, "$.products[*].pId", "DIALECT", 3)[3][2]) for i, v in ipairs(result) do result[i] = "product:"..v end return result' 0 "N6_nPuq6oSnY9DO"
// eval 'local result = cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}", "return", 1, "$.products[*].pId", "DIALECT", 3)[3][2]) for i, v in ipairs(result) do result[i] = "product:"..v end return redis.call("JSON.MGET", unpack(result), "$" )' 0 "N6_nPuq6oSnY9DO"
var that = (module.exports = {
  getCart: async (userId) => {
    const pipeline = redis.pipeline()
    const listItem = await redis
      .call('JSON.GET', PREFIX.concat(userId), '$.products')
      .then((result) => JSON.parse(result)[0])

    listItem
      .reduce((results, item) => {
        return results.concat(item.itemId)
      }, [])
      .forEach((itemId) => pipeline.getItemInfo(0, itemId))

    const listItemInfo = await pipeline.exec().then((arr) => {
      return arr.map(([_, foundItem], index) => {
        // foundItem === [ 'title', 'Váy Suông Dáng Dài Cổ Yếm Đuôi Cá',...] =\
        // Nên sẽ đưa về dạng object {title:  'Váy Suông Dáng Dài Cổ Yếm Đuôi Cá', ...}
        return {
          ...listItem[index],
          ...foundItem.reduce((item, key, index) => {
            if (index % 2 === 0) {
              item[key] = foundItem[index + 1]
            }
            return item
          }, {}),
        }
      })
    })

    return listItemInfo
  },
  getItemByIndex: async ({ userId, index }) => {
    return JSON.parse(await redis.call('JSON.GET', PREFIX.concat(userId), `$.products[${index}]`))[0]
  },

  /**
   * Thêm mới sản phẩm vào list product, tạo mới key nêu chưa tồn tại trong redis
   */
  addItem: async ({ itemId, pId, sizeId, quantity, userId, sizeName }) => {
    const pipeline = redis.pipeline()
    // prettier-ignore
    pipeline.call('JSON.SET', PREFIX.concat(userId), '$', JSON.stringify({userId,products:[]}), 'NX')
    .call(
      'JSON.ARRAPPEND', PREFIX.concat(userId), '$.products' , JSON.stringify({ itemId, pId, sizeId, quantity, sizeName })
    )

    return pipeline.exec()
  },

  /**
   * Kiểm tra sự tồn tại sp cùng size và màu
   * @returns 1 | 0
   */
  isExistsItem: ({ itemId, sizeId, userId }) => {
    return redis
      .call('FT.SEARCH', SEARCH_INDEX, `@userId:{${userId}} @itemId:{${itemId}} @sizeId:{${sizeId}}`, 'nocontent')
      .then((res) => res[0])
  },

  // updateItem: async (data) => {
  //   const { itemId, pId, sizeId, quantity, userId, sizeName, index } = data
  //   // prettier-ignore
  //   const updatePromise =  redis.call(
  //     'JSON.SET', PREFIX.concat(userId), `$.products[?(@.itemId=="${itemId}"&&@.sizeId=="${sizeId}")]`,
  //     JSON.stringify({ itemId: `${itemId}`, pId, sizeId, quantity, sizeName })
  //   )
  //   if (index) {
  //     const getCartItemIndexPromise = redis
  //       .call('JSON.GET', PREFIX.concat(userId), `$.products[${index}]`)
  //       .then((res) => JSON.parse(res)[0])
  //     const [updateStatus, getCartResult] = await Promise.all([updatePromise, getCartItemIndexPromise])
  //     console.log(getCartResult)
  //     return [updateStatus, getCartResult]
  //   }
  //   return updatePromise
  // },
  updateItemByIndex: async (data) => {
    const { itemId, pId, sizeId, quantity, userId, sizeName, index } = data
    // prettier-ignore
    return redis.call(
      'JSON.SET', PREFIX.concat(userId), `$.products[${index}]`,
      JSON.stringify({ itemId: `${itemId}`, pId, sizeId, quantity, sizeName })
    )
  },

  patchItemQuantity: async ({ userId, itemId, sizeId, quantity, index }) => {
    index = index ?? `?(@.itemId=="${itemId}"&&@.sizeId=="${sizeId}")`
    return redis.call('JSON.NUMINCRBY', PREFIX.concat(userId), `$.products[${index}].quantity`, quantity * 1)
  },

  putItemQuantity: async ({ userId, index, quantity }) => {
    console.log(typeof index)
    return redis.call('JSON.SET', PREFIX.concat(userId), `$.products[${index * 1}].quantity`, quantity * 1)
  },

  removeItem: async ({ index, userId }) => {
    return redis.call('JSON.ARRPOP', PREFIX.concat(userId), '$.products', index * 1)
  },
  init: async () => {
    let indices = await redis.call('FT._list')
    if (indices.includes(SEARCH_INDEX)) {
      await redis.call('FT.DROPINDEX', SEARCH_INDEX)
    }
    redis.defineCommand('getItemInfo', {
      lua: getItemInfoScript(),
    })
    // prettier-ignore
    await redis.call(
      'FT.CREATE', SEARCH_INDEX,
      'ON', 'JSON',
      'PREFIX', 1, PREFIX,
      'SCHEMA',
        '$.userId','as','userId', 'TAG',
        '$.products[*].pId','as','pId', 'TAG',
        '$.products[*].itemId','as','itemId', 'TAG', 
        '$.products[*].sizeId','as','sizeId', 'TAG',
        '$.products[*].sizeName','as','sizeName', 'TAG',
        '$.products[*].quantity','as', 'quantity', 'NUMERIC'
    )
  },
})
