import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, 'Логин обязателен'],
        unique: true,
        minlength: [3, 'Логин должен содержать минимум 3 символа'],
        maxLength: [50, 'Логин должен содержать минимум 50 символов'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Пароль обязателен'],
        minlength: [6, 'Логин должен содержать минимум 6 символов'],
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'guest',
    }
})

export const User = mongoose.model('User', userSchema)