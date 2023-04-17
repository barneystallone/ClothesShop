import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from './category/category.slice'
import productModalReducer from './product/productModal.slice'
import { api } from "./api/apiSlice";
import { rtkErrorLogger } from "./middleware";
import authReducer from "./auth/auth.slice";


const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    category: categoryReducer,
    productModal: productModalReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        api.middleware, rtkErrorLogger
    )

})