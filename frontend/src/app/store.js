import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from './category/categorySlice'
import logger from "redux-logger";


const rootReducer = combineReducers({
    category: categoryReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({

    }).concat(logger)

})