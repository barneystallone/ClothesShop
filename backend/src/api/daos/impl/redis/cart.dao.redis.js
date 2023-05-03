const redis = require('../../../databases/connect.redis.v2')
const SEARCH_INDEX = 'carts'
const PREFIX = 'cart:'

// const temp = {pId,itemId,sizeId,sizeName,quantity,
//   url,
//   thumbUrl,
//   colorCode,
//   colorName,
//   slug,
//   title,
//   price,
// }
// eval 'return cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}" ,"return", 1, "$.products[*].pId", "DIALECT",3 )[3][2])' 0 "N6_nPuq6oSnY9DO"
// eval 'local result = cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}", "return", 1, "$.products[*].pId", "DIALECT", 3)[3][2]) for i, v in ipairs(result) do result[i] = "product:"..v end return result' 0 "N6_nPuq6oSnY9DO"
// eval 'local result = cjson.decode(redis.call("FT.SEARCH", "carts", "@userId:{"..ARGV[1].."}", "return", 1, "$.products[*].pId", "DIALECT", 3)[3][2]) for i, v in ipairs(result) do result[i] = "product:"..v end return redis.call("JSON.MGET", unpack(result), "$" )' 0 "N6_nPuq6oSnY9DO"
var that = (module.exports = {
  getCart: async (userId) => {
    redis.call('JSON.GET', PREFIX.concat(userId))
    return
  },

  /**
   * Thêm mới sản phẩm vào list product, tạo mới key nêu chưa tồn tại trong redis
   * @returns
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

  updateItem: async (data) => {
    const { itemId, pId, sizeId, quantity, userId, sizeName } = data
    // prettier-ignore
    return redis.call(
      'JSON.SET', PREFIX.concat(userId), `$.products[?(@.itemId=="${itemId}"||@.sizeId=="${sizeId}")]`,
      JSON.stringify({ itemId: `${itemId}`, pId, sizeId, quantity, sizeName })
    )
  },

  updateItemQuantity: async ({ userId, index, value, quantity }) => {
    console.log({ userId, index, value, quantity })
    if (quantity) {
      return redis.call('JSON.SET', PREFIX.concat(userId), `$.products[${index * 1}].quantity`, quantity * 1)
    }
    return redis.call('JSON.NUMINCRBY', PREFIX.concat(userId), `$.products[${index * 1}].quantity`, value * 1)
  },

  removeItem: async ({ index, userId }) => {
    return redis.call('JSON.ARRPOP', PREFIX.concat(userId), '$.products', index * 1)
  },
  init: async () => {
    let indices = await redis.call('FT._list')
    if (indices.includes(SEARCH_INDEX)) {
      await redis.call('FT.DROPINDEX', SEARCH_INDEX)
    }
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
