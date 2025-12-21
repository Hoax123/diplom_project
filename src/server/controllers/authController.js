import dotenv from 'dotenv';
dotenv.config();

import {User} from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET

export async function register(req, res) {
    try {
        const {login, password, role} = req.body

        if (!login || !password) {
            return res.status(400).json({success: false, error: 'Логин и пароль обязательны!'})
        }

        if (login.trim().length < 3) {
            return res.status(400).json({success: false, error: "Логин должен содержать минимум 3 символа!"})
        }

        if (password.length < 6) {
            return res.status(400).json({success: false, error: "Пароль должен содержать минимум 6 символов!"})
        }

        const existing = await User.findOne({login})
        if (existing) {
            return res.status(409).json({success: false, error: "Такой пользователь уже существует"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            login,
            password: hashedPassword,
            role: role || 'user',
        })

        res.status(201).json({success: true, data: {id: user._id, login: user.login, role: user.role}
        })
    } catch (error) {
        return res.status(500).json({success: false, error: "Ошибка сервера"})
    }
}

export async function login(req, res) {
    try {
        const {login, password} = req.body

        const user = await User.findOne({login})
        if (!user) {
            return res.status(404).json({success: false, error: 'Пользователь не существует'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({success: false, error: 'Неправильный пароль'})
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json({success: true, token, user: {id: user._id, login: user.login, role: user.role}})

    } catch(error) {
        return res.status(500).json({success: false, error: "Ошибка сервера"})
    }
}

export function logout(req, res) {
    res.clearCookie('token')
    return res.status(200).json({success: true, message: "Вы вышли из системы"})
}