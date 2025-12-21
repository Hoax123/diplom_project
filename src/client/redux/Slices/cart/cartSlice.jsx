import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleHttpError} from "../../utils/handleHttpError.js";

const API = import.meta.env.VITE_API_URL + '/cart'

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(API, {
                method: 'GET',
                credentials: 'include'
            })

           const data = await handleHttpError(response)

            if (!data.success) return thunkAPI.rejectWithValue(data.error)

            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            const response = await fetch(`${API}/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({productId, quantity}),
                credentials: 'include',
            })

            const data = await handleHttpError(response)

            if (!data.success) return thunkAPI.rejectWithValue(data.error)

            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId }, thunkAPI) => {
        try {
            const response = await fetch(`${API}/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const data = await handleHttpError(response)

            if (!data.success) return thunkAPI.rejectWithValue(data.error)

            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    status: "idle",
    error: null,
}

function recalc(state) {
    state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
    state.totalAmount = state.items.reduce((sum, item) => {
        const price = typeof item.productId === 'object' ? item.productId.price : 0
        return sum + item.quantity * price
    }, 0)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.items = []
            state.totalAmount = 0
            state.totalQuantity = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload?.items || []
            recalc(state)
            })
            .addCase(fetchCart.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload?.items || []
                recalc(state)
            })

            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload?.items || []
                recalc(state)
            })

    }
})

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;