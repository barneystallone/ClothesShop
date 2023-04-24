import { api } from '../../apiSlice'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: 'product',
        params: params
      }),
      providesTags: (results) =>
        results
          ? [...results.data.map(({ pId }) => ({ type: 'Products', pId })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    getProduct: build.query({
      query: (slug) => `product/${slug}`,
      providesTags: (result) => [{ type: 'Products', id: result.pId }],
      keepUnusedDataFor: 20
    }),
    getRelatedProducts: build.query({
      query: (slug) => `product/related/${slug}`,
      providesTags: (results) =>
        results
          ? [...results.products.map(({ pId }) => ({ type: 'Products', pId })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
      keepUnusedDataFor: 30
    })
  })
})

export const { useGetProductsQuery, useGetProductQuery, useGetRelatedProductsQuery } = productApi
