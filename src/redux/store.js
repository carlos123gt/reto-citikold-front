import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import loaderReducer from "./loaderSlice"

export const store = configureStore({
    reducer: {
         user: userReducer,
         loader: loaderReducer,
    }
})