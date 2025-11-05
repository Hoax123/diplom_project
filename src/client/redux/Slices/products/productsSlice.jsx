import {createSlice} from '@reduxjs/toolkit'
import {products as mockProducts} from "../../../db.js";

const initialState = {
    list: mockProducts,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdd: (state, action) => {
            state.list.push(action.payload)
        },
        productDelete: (state, action) => {
            const id = action.payload
            state.list = state.list.filter(item => item.id !== id)
        },
        productUpdate: (state, action) => {
            const updatedProduct = action.payload
            const ProductIndexToUpdate = state.list.findIndex(item => item.id === updatedProduct.id)
            if (ProductIndexToUpdate !== -1) {
                state.list[ProductIndexToUpdate] = updatedProduct
            }
        },
    }
})

export const {productAdd, productDelete, productUpdate} = productsSlice.actions;
export default productsSlice.reducer