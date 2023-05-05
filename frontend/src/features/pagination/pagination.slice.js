import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPage: 1,
  activePage: 0
}

export const paginationSlice = createSlice({
  initialState,
  name: 'pagination',
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    }
  }
})

export const { setActivePage, setTotalPage } = paginationSlice.actions
export default paginationSlice.reducer

export const selectActivePage = (state) => state.pagination.activePage
export const selecTotalPage = (state) => state.pagination.totalPage
