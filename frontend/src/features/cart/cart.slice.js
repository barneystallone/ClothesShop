import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCart: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showCart: (state, payload) => {
      state.showCart = payload
    }
  }
})

export const { showCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartStatus = (state) => state.cart.showCart
