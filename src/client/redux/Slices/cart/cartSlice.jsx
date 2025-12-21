import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleHttpError} from "../../utils/handleHttpError.js";

const API_URL = import.meta.env.VITE_API_URL + '/cart'

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(API_URL, {
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
            const response = await fetch(`${API_URL}/add`, {
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
            const response = await fetch(`${API_URL}/${productId}`, {
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
        if (item.productId && typeof item.productId === 'object' && 'price' in item.productId) {
            return sum + item.quantity * item.productId.price
        }

        return sum
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