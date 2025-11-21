import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL

export const fetchProducts = createAsyncThunk(
    "/products/fetchProducts",
    async (_, thunkAPI) => {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error);

        return data.data;
    }
)

export const createProduct = createAsyncThunk(
    "/products/create",
    async ({product, token}, thunkAPI) => {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        })
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error);

        return data.data
    }
)

export const updateProduct = createAsyncThunk(
    "/products/update",
    async ({id, product, token}, thunkAPI) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        })
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error);

        return data.data
    }
)

export const deleteProduct = createAsyncThunk(
    "/products/delete",
    async ({id, token}, thunkAPI) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error);

        return id
    }
)

const initialState = {
    list: [],
    status: "idle",
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(createProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'

                const updated = action.payload
                state.list = state.list.map(item =>
                    item._id === updated._id ? updated : item)
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(deleteProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'

                const id = action.payload
                state.list = state.list.filter(item => item._id !== id)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export default productsSlice.reducer