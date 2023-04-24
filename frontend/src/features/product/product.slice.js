import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: {
    productSlug: '',
    isShow: false
  }
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductModalSlug: (state, action) => {
      state.modal.productSlug = action.payload
      state.modal.isShow = true
    },
    removeProductModalSlug: (state) => {
      state.modal = initialState.modal
    }
  }
})

export default productSlice.reducer
export const { setProductModalSlug, removeProductModalSlug } = productSlice.actions

export const selectProductModalSlug = (state) => state.product.modal.productSlug
export const selectShowModalStatus = (state) => state.product.modal.isShow
