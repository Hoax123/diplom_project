import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {handleHttpError} from "../../utils/handleHttpError.js";

const API_URL = import.meta.env.VITE_API_URL

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({login, password, role = 'user'}, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({login, password, role}),
                credentials: 'include',
            })

            const data = await handleHttpError(response)

            if (!data.success) return thunkAPI.rejectWithValue(data.error || 'server error')

            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({login, password}, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({login, password}),
                credentials: 'include',
            })

            const data = await handleHttpError(response)

            if (!data.success) return thunkAPI.rejectWithValue(data.error || 'server error')

            localStorage.setItem('user', JSON.stringify(data.user))
            return data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            })
            const data = await handleHttpError(response)

            localStorage.removeItem('user')

            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: null,
    status: "idle",
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = null
                state.user = action.payload

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null
                state.status = 'idle'
            })
    }
})

export const {clearAuthError} = authSlice.actions
export default authSlice.reducer