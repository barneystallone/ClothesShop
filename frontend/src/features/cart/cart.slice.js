import { createSelector, createSlice } from '@reduxjs/toolkit'
import { createTransform } from 'redux-persist'

const initialState = {
  showCart: false,
  listItem: []
}
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShowCart: (state, action) => {
      state.showCart = action.payload
    },
    putCartItem: (state, action) => {
      const foundIndex = state.listItem.findIndex(
        (item) =>
          item.itemId === action.payload.itemId && item.sizeId === action.payload.sizeId
      )
      foundIndex >= 0
        ? (state.listItem[foundIndex].quantity += action.payload.quantity)
        : state.listItem.push(action.payload)
    },
    updateCartItem: (state, action) => {
      const { index, ...itemPayload } = action.payload //
      const foundIndex = state.listItem.findIndex(
        (item) =>
          item.itemId === action.payload.itemId && item.sizeId === action.payload.sizeId
      )
      if (foundIndex === index) {
        state.listItem[foundIndex] = itemPayload
        return
      }
      if (foundIndex >= 0) {
        state.listItem[foundIndex].quantity += itemPayload.quantity
        state.listItem.splice(index, 1)
        return
      }
      state.listItem[index] = itemPayload
    },
    setCartItemQuantity: (state, action) => {
      state.listItem[action.payload.index].quantity = action.payload.quantity
    }
  }
})
/**
 * transform listItem để persist data :
 * inbountState  ==> Từ redux -> localStorage
 * outbountState ==> Từ localStorage -> redux store
 */
// export const CartTransform = createTransform(
//   (inboundState, key) => {
//     // console.log('inboundState::', inboundState)
//     const newListItem = inboundState?.map(({ pId, itemId, sizeId, quantity }) => ({
//       pId,
//       itemId,
//       sizeId,
//       quantity
//     }))
//     // console.log(newListItem)
//     return [...newListItem]
//   },
//   (outboundState) => outboundState,
//   { whitelist: ['listItem'] }
// )
const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  version: 1,
  // transforms: [CartTransform],
  blacklist: ['showCart'] // thêm listItem vào whitelist
}

export const { setShowCart, putCartItem, setCartItemQuantity, updateCartItem } =
  cartSlice.actions
export default persistReducer(cartPersistConfig, cartSlice.reducer)

export const selectCartStatus = (state) => state.cart.showCart
export const selectListCartItem = (state) => state.cart.listItem

export const selectTotalProductCount = (state) => {
  return state.cart.listItem.reduce((totalCount, item) => totalCount + item.quantity, 0)
}

export const selectTotalCartPrice = (state) => {
  return state.cart.listItem.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  )
}
// export const selectTotalCartPrice = createSelector([selectListCartItem], (listItem) => {
//   return listItem.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
// })
// export const selectTotalProductCount = createSelector(
//   [selectListCartItem],
//   (listItem) => {
//     return listItem.reduce((totalCount, item) => totalCount + item.quantity, 0)
//   }
// )
