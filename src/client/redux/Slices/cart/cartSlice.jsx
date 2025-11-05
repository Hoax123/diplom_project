import {createSlice} from "@reduxjs/toolkit";


const initialCartList = [{
    id: 7,
    name: "Рубашка с широким рукавом",
    category: "рубашка",
    price: 12900,
    quantity: 8,
    image: "https://cdn-sh1.vigbo.com/shops/199204/products/22048244/images/3-acbe255cf3d8ec30eaf75e91bcf8c825.JPG?version=undefined"
},
    {
        id: 8,
        name: "Рубашка со шлейфом",
        category: "рубашка",
        price: 9800,
        quantity: 6,
        image: "https://cdn-sh1.vigbo.com/shops/199204/products/21786432/images/2-4d3e8a41e2d185fd43554667d2827d2e.JPG"
    },
    {
        id: 9,
        name: "Ассиметричная рубашка",
        category: "рубашка",
        price: 13400,
        quantity: 4,
        image: "https://cdn-sh1.vigbo.com/shops/199204/products/23963664/images/2-bbee98f4b181ca854e7ee21a2235d82b.JPG"
    }]

const initialState = {
    cartList: initialCartList,
    totalQuantity: initialCartList.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: initialCartList.reduce((sum, item) => sum + item.quantity * item.price, 0),
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            state.cartList.push(action.payload);

            state.totalAmount = state.cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)
            state.totalQuantity = state.cartList.reduce((sum, item) => sum + item.quantity, 0)
        },
        deleteProductFromCart: (state, action) => {
            const id = action.payload;
            state.cartList = state.cartList.filter(product => product.id !== id);

            state.totalAmount = state.cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)
            state.totalQuantity = state.cartList.reduce((sum, item) => sum + item.quantity, 0)
        },
        recalculateTotals(state) {
            state.totalAmount = state.cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)
            state.totalQuantity = state.cartList.reduce((sum, item) => sum + item.quantity, 0)
        }
    }
})

export const {addProductToCart, deleteProductFromCart, recalculateTotals} = cartSlice.actions;
export default cartSlice.reducer;