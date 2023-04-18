import { createSlice } from '@reduxjs/toolkit'
// import { api } from "../api/axios";
// import axios from "axios";
const initialState = {
  categories: null
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // get
  },
  extraReducers(builder) {}
})

export default categorySlice.reducer
