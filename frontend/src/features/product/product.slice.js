import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: {
    productSlug: '',
    isShow: false,
    typeUpdate: false,
    initialItem: null
  },
  filter: {
    categoryIds: []
  }
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductModalSlug: (state, action) => {
      if (action.payload?.initialItem) {
        state.modal.productSlug = action.payload.slug
        state.modal.initialItem = action.payload.initialItem
        state.modal.isShow = true
        state.modal.typeUpdate = true
        return
      }

      state.modal.productSlug = action.payload
      state.modal.isShow = true
    },
    closeProductModal: (state) => {
      state.modal = initialState.modal
    }
  }
})

export default productSlice.reducer
export const { setProductModalSlug, closeProductModal, setInitItem } =
  productSlice.actions

export const selectProductModalSlug = (state) => state.product.modal.productSlug
export const selectShowModalStatus = (state) => state.product.modal.isShow
export const selectInitialItem = (state) => state.product.modal.initialItem
export const selectProductModalType = (state) => state.product.modal.typeUpdate
