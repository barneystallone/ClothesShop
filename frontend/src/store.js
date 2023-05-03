import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { rtkErrorLogger } from './middleware'
import { api } from './apiSlice'
import productReducer from './features/product/product.slice'
import categoryReducer from './features/category/category.slice'
import authReducer from './features/auth/auth.slice'
import cartReducer from './features/cart/cart.slice'
import paginationReducer from './features/pagination/pagination.slice'
// import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  pagination: paginationReducer
})

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   transforms: [CartTransform],
//   whitelist: ['']
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware, rtkErrorLogger)
})

let persistor = persistStore(store, {})
export { store, persistor }
