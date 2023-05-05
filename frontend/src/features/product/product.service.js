import { api } from '../../apiSlice'
import qs from 'qs'
const alphabetSort = (a, b) => a.localeCompare(b)

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      // params : {page, categoryFilter:c}
      query: (params) => {
        if (params?.c) {
          params.c = params.c.sort().join('|')
        }
        // console.log('params::', qs.stringify(params, { sort: alphabetSort }))
        return { url: `product?${qs.stringify(params, { sort: alphabetSort })}` }
      },
      keepUnusedDataFor: 60,
      providesTags: (results) =>
        results
          ? [
              ...results.products.map(({ pId }) => ({ type: 'Products', pId })),
              { type: 'Products', id: 'LIST' }
            ]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    getProduct: build.query({
      query: (slug) => `product/${slug}`,
      providesTags: (result) => [{ type: 'Products', id: result.pId }],
      keepUnusedDataFor: 30
    }),
    getRelatedProducts: build.query({
      query: (slug) => `product/related/${slug}`,
      providesTags: (results) =>
        results
          ? [
              ...results.products.map(({ pId }) => ({ type: 'Products', pId })),
              { type: 'Products', id: 'LIST' }
            ]
          : [{ type: 'Products', id: 'LIST' }],
      keepUnusedDataFor: 30
    })
  })
})

export const { useGetProductsQuery, useGetProductQuery, useGetRelatedProductsQuery } =
  productApi
