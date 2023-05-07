import { api } from '../../apiSlice'

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart',
      providesTags: (results) => {
        if (results) {
          return [
            ...results.map((item) => {
              const { sizeId, itemId } = item
              return { type: 'Cart', id: { sizeId, itemId } }
            }),
            { type: 'Cart', id: 'LIST' }
          ]
        }
        return [{ type: 'Cart', id: 'LIST' }]
      }
    }),
    // PUT => ADD/UPDATE
    putItem: builder.mutation({
      query: (item) => ({
        url: 'cart/item',
        method: 'PUT',
        body: item // { quantity, sizeId, itemId, sizeName, pId }
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
    // PATCH => UPDATE
    patchItem: builder.mutation({
      query: (item) => ({
        url: 'cart/item',
        method: 'PATCH',
        body: item
      }),
      invalidatesTags: (result, error, item) => {
        return [{ type: 'Cart', id: { sizeId: item.sizeId, itemId: item.itemId } }]
      }
    }),

    putItemQuantity: builder.mutation({
      query: (item) => {
        // item -> { index, quantity, sizeId, itemId }
        const { index, quantity } = item
        return { url: 'cart/item-quantity', method: 'PUT', body: { index, quantity } }
      },
      invalidatesTags: (result, error, item) => {
        return [{ type: 'Cart', id: { sizeId: item.sizeId, itemId: item.itemId } }]
      }
    }),

    deleteItem: builder.mutation({
      query: ({ index, itemId, sizeId }) => ({
        url: 'cart/item',
        method: 'DELETE',
        body: { index }
      }),
      invalidatesTags: (result, err, { sizeId, itemId }) => {
        return [{ type: 'Cart', id: { sizeId, itemId } }]
      }
    }),
    syncCartToDB: builder.mutation({
      query: (listItem) => ({
        url: 'cart/sync',
        method: 'PUT',
        body: listItem
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    })
  })
})

export const {
  useGetCartQuery,
  usePutItemMutation,
  usePutItemQuantityMutation,
  usePatchItemMutation,
  useDeleteItemMutation,
  useSyncCartToDBMutation
} = cartApi
