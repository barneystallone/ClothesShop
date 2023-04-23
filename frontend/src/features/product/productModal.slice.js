import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productSlug: '',
  isShow: false
}

export const productModalSlice = createSlice({
  name: 'productModal',
  initialState,
  reducers: {
    setProductSlug: (state, action) => {
      state.productSlug = action.payload
      state.isShow = true
    },
    removeProductSlug: () => initialState
  }
})

export default productModalSlice.reducer
export const { setProductSlug, removeProductSlug } = productModalSlice.actions

export const selectProductModalSlug = (state) => state.productModal.productSlug
export const selectShowModalStatus = (state) => state.productModal.isShow
