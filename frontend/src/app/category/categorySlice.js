import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axios";
import axios from "axios";
const initialState = {
    isLoading: true,
    categories: null,
    message: ''
}
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // get
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = true;
                state.categories = null;
                state.message = action.error.message
            })
    }
})

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const data = await api.get('/category').then(res => res.data);
        return data;
    })



export default categorySlice.reducer