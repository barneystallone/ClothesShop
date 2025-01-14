import { createSelector, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { typeOf } from '../../utils'

const initialState = {
  showCart: false,
  listItem: []
}

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
    },
    incrCartItemQuantity: (state, action) => {
      state.listItem[action.payload.index].quantity += action.payload.quantity
    },

    removeCartItem: (state, action) => {
      const { index, itemId, sizeId } = action.payload
      if (typeOf(index) === 'Number') {
        state.listItem.splice(index, 1)
        return
      }
      console.log('Expected type Number, validation err::', typeOf(index))
    },

    setCart: (state, action) => {
      if (typeOf(action.payload) === 'Array') {
        state.listItem = action.payload
      }
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

export const {
  setCart,
  setShowCart,
  putCartItem,
  incrCartItemQuantity,
  setCartItemQuantity,
  removeCartItem,
  updateCartItem
} = cartSlice.actions
export default persistReducer(cartPersistConfig, cartSlice.reducer)

export const selectCartStatus = (state) => state.cart.showCart
export const selectListCartItem = (state) => state.cart.listItem
export const selectItemCount = (state) => state.cart.listItem.length

export const selectTotalCartPrice = createSelector([selectListCartItem], (listItem) => {
  return listItem.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
})

export const selectTotalItemQuantity = createSelector(
  [selectListCartItem],
  (listItem) => {
    return listItem.reduce((totalCount, item) => totalCount + item.quantity, 0)
  }
)
