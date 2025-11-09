import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
    "/products/fetchProducts",
    async (_, thunkAPI) => {
        const response = await fetch("http://localhost:5003/api/products");
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error);

        return data.data;
    }
)

export const createProduct = createAsyncThunk(
    "/products/create",
    async ({product, token}, thunkAPI) => {
        const response = await fetch("http://localhost:5003/api/products", {
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
        const response = await fetch(`http://localhost:5003/api/products/${id}`, {
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
        const response = await fetch(`http://localhost:5003/api/products/${id}`, {
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
    },
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


            .addCase(updateProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'

                const updated = action.payload
                state.list = state.list.map(item =>
                    item._id === updated.id ? updated : item)
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

                const {id} = action.payload
                state.list = state.list.filter(item => item._id !== id)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const {productAdd, productDelete, productUpdate} = productsSlice.actions;
export default productsSlice.reducer