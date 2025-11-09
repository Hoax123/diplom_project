import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = "http://localhost:5003/api"

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({login, password, role = 'user'}, thunkAPI) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, password, role}),
        })

        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error || 'server error')

        return data.data
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({login, password}, thunkAPI) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, password}),
        })
        const data = await response.json()

        if (!data.success) return thunkAPI.rejectWithValue(data.error || 'server error')

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data
    }
)

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: "idle",
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            state.status = "idle"
            state.error = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
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
                state.token = action.payload.token
                state.user = action.payload.user

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer