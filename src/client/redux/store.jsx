import {configureStore} from "@reduxjs/toolkit";
import productsReducer from './Slices/products/productsSlice.jsx'
import cartReducer from './Slices/cart/cartSlice.jsx'
import authReducer from './Slices/auth/authSlice.jsx'

export const store = configureStore({
    reducer: {
        "products": productsReducer,
        "cart": cartReducer,
        "auth": authReducer
    }
})