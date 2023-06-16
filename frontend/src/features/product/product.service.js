import { api } from '../../apiSlice'
import qs from 'qs'
const alphabetSort = (a, b) => a.localeCompare(b)

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      // params : {page, c} c -> categoryFilter
      query: (params) => {
        console.log(params)
        let newParams = { ...params }
        if (params?.c && params?.c.length) {
          newParams.c = params.c.join('|')
        }
        // console.log('params::', qs.stringify(params, { sort: alphabetSort }))
        return { url: `product?${qs.stringify(newParams, { sort: alphabetSort })}` }
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
      providesTags: (result, error, args) =>
        result
          ? [{ type: 'Products', id: result.pId }]
          : error?.status === 'FETCH_ERROR'
          ? ['FETCH_ERROR']
          : ['UNKNOWN_ERROR'],

      keepUnusedDataFor: 30
    }),
    getRelatedProducts: build.query({
      query: (slug) => `product/related/${slug}`,
      providesTags: (results, error, args) =>
        results
          ? [
              ...results.products.map(({ pId }) => ({ type: 'Products', pId })),
              { type: 'Products', id: 'LIST' }
            ]
          : error?.status === 'FETCH_ERROR'
          ? ['FETCH_ERROR']
          : ['UNKNOWN_ERROR'],
      keepUnusedDataFor: 30
    }),
    searchAutoSuggest: build.query({
      query: (params) => ({
        url: 'product/suggest',
        params: params
      })
    }),
    searchProducts: build.query({
      query: (params) => ({
        url: 'product/search',
        params: params
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useSearchAutoSuggestQuery,
  useLazySearchAutoSuggestQuery,
  useLazySearchProductsQuery,
  useSearchProductsQuery
} = productApi
