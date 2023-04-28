import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { rtkErrorLogger } from './middleware'
import { api } from './apiSlice'
import productReducer from './features/product/product.slice'
import categoryReducer from './features/category/category.slice'
import authReducer from './features/auth/auth.slice'
import paginationReducer from './features/pagination/pagination.slice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  pagination: paginationReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkErrorLogger)
})
