import { createSelector, createSlice } from '@reduxjs/toolkit'
import { capitalizeWords, typeOf } from '../../utils'
import qs from 'qs'
const alphabetSort = (a, b) => a.localeCompare(b)

const initialState = {
  modal: {
    productSlug: '',
    isShow: false,
    typeUpdate: false,
    initialItem: null
  },
  filter: {
    categories: [] //  ~~ [[1,2,3],[4,5,6]]
  },
  search: {
    showModal: false,
    keyword: ''
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
    },
    initCategoryFilters: (state, action) => {
      if (typeOf(action.payload) === 'Number') {
        state.filter.categories = Array.from({ length: action.payload }, () => [])
      }
      if (typeOf(action.payload) === 'Array') {
        state.filter.categories = action.payload
      }
    },
    setAllSubCategoryFilter: (state, action) => {
      const { index, subIdsArr, check } = action.payload
      if ('index' in action.payload && subIdsArr && typeOf(subIdsArr) === 'Array') {
        if (check) {
          state.filter.categories[index] = subIdsArr
          return
        }
        state.filter.categories[index] = []
      }
    },
    setFilter: (state, action) => {
      const { index, subId, check } = action.payload
      if ('index' in action.payload && subId) {
        if (!check) {
          const subIndex = state.filter.categories[index].findIndex((id) => id === subId)
          if (subIndex < 0) {
            console.warn('Err::', action.payload)
            return
          }
          state.filter.categories[index].splice(subIndex, 1)
          return
        }
        state.filter.categories[index].push(subId)
      }
    },
    setShowSearchModalStatus: (state, action) => {
      state.search.showModal = action.payload
    },
    setKeyword: (state, action) => {
      state.search.keyword = action.payload
    }
  }
})

export default productSlice.reducer
export const {
  setProductModalSlug,
  closeProductModal,
  setShowSearchModalStatus,
  setKeyword,
  setInitItem,
  initCategoryFilters,
  setAllSubCategoryFilter,
  setFilter
} = productSlice.actions

export const selectProductModalSlug = (state) => state.product.modal.productSlug
export const selectShowModalStatus = (state) => state.product.modal.isShow
export const selectInitialItem = (state) => state.product.modal.initialItem
export const selectProductModalType = (state) => state.product.modal.typeUpdate
export const selectAllCategoryFilters = createSelector(
  (state) => state.product.filter.categories,
  (listFilter) =>
    listFilter.reduce((result, pCategory) => result.concat(pCategory), []).sort()
)
// export const selectQueryStringCategoryFilter = createSelector(
//   (state) => state.product.filter.categories,
//   (listFilter) => {
//     listFilter = listFilter.sort().join('|')
//   }
// )
export const selectFilterByParentIdx = (index) => (state) =>
  state.product.filter.categories[index]
export const selectCapitalizeKeyword = (state) =>
  capitalizeWords(state.product.search.keyword.trim())

export const selectKeyword = (state) => state.product.search.keyword
export const selectSearchModalStatus = (state) => state.product.search.showModal
