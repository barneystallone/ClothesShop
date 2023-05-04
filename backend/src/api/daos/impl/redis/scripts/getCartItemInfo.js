var that = (module.exports = {
  getItemInfoScript: () => {
    return `local collection = "$.collections[?(@.itemId==\\""..ARGV[1].."\\")]"
    local result = redis.call(
        "ft.search" ,"products", "@itemId:{"..ARGV[1].."}" ,
        "return", 12 ,
        "title" ,"price" ,"slug" ,  
        collection..".url", "as" ,"url" ,
        collection..".colorName", "as", "colorName",
        collection..".colorCode", "as", "colorCode"
      )

      return result[3];
    `

    // return `local collection = "$.collections[?(@.itemId==\\"${itemId}\\")]"
    //   local result = redis.call(
    //     "ft.search" ,"products", "@itemId:{${itemId}}" ,
    //     "return", 15 ,"title" ,"price" ,"slug" ,  collection..".url", "as" ,"url" ,
    //     collection..".thumbUrl", "as", "thumbUrl",collection..".colorName", "as", "colorName",
    //     collection..".colorCode", "as", "colorCode"
    //   )[3];
    //   return result
    // `
    // return `local collection = string.format('$.collections[?(@.itemId==\\"%s\\")]', ARGV[1])
    //   local result = redis.call(
    //     "ft.search" ,"products", "@itemId:{"..ARGV[1].."}" ,
    //     "return", 15 ,"title" ,"price" ,"slug" ,  collection..".url", "as" ,"url" ,
    //     collection..".thumbUrl", "as", "thumbUrl",collection..".colorName", "as", "colorName",
    //     collection..".colorCode", "as", "colorCode"
    //   )[3];
    //   return result
    // `
  },
})
