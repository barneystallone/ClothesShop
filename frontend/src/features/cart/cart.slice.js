import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCart: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShowCart: (state, action) => {
      state.showCart = action.payload
    }
  }
})

export const { setShowCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartStatus = (state) => state.cart.showCart
