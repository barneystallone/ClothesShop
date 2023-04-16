import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from './category/category.slice'
// import logger from "redux-logger";
import productModalReducer from './product/productModal.slice'
import { api } from "./api/apiSlice";
import { rtkErrorLogger } from "./middleware";


const rootReducer = combineReducers({
    category: categoryReducer,
    productModal: productModalReducer,
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkErrorLogger)

})