import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'guest',
    }
})

export const User = mongoose.model('User', userSchema)