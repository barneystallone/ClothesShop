var that = (module.exports = {
  getRelatedProductsScript: () => {
    return `
      local foundCategory = redis.call(
        "FT.SEARCH", "products", "@slug:{" .. ARGV[1] .. "}",
        "RETURN", 1, "category_id"
      )
      if foundCategory[1] ~= 0 then
        local categoryId = foundCategory[3][2]
        local results = redis.call(
          "FT.SEARCH", "products", "@category_id:{" .. categoryId .. "} -@slug:{" .. ARGV[1] .. "}",
          "DIALECT", 3, "RETURN", 11, "pId", "title", "price", "slug", "sold", 
          "$.collections[*].url", "as", "url", "$.collections[*].thumbUrl", "as", "thumbUrl",
          "LIMIT", 0, 1000
        )
        local offset = ARGV[2] - results[1]
        
        if offset > 0 then
          local arr = redis.call(
            "FT.SEARCH", "products", "-@slug:{" .. ARGV[1] .. "}",
            "DIALECT", 3, "RETURN", 11, "pId", "title", "price", "slug", "sold", "$.collections[*].url", "as", 
            "url", "$.collections[*].thumbUrl", "as", "thumbUrl",
            "LIMIT", 0, 1000
          )
          local extra = {}
          local rand
          for i = 1, offset do
            rand = math.random(#arr / 2) * 2
            table.insert(extra, arr[rand])
            table.insert(extra, arr[rand + 1])
            table.remove(arr, rand)
            table.remove(arr, rand)
          end
          for i = 1, #extra do
            results[#results + 1] = extra[i]
          end
          return results
        else
          local newResults = {results[1]}
          local rand
          for i = 1, ARGV[2] do
            rand = math.random(#results / 2) * 2
            table.insert(newResults, results[rand])
            table.insert(newResults, results[rand + 1])
            table.remove(results, rand)
            table.remove(results, rand)
          end
          
          return newResults
        end
      else 
          return  0
      end
      
      
    `
  },
})
