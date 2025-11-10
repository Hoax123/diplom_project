import {User} from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = "supersecret"

export async function register(req, res) {
    try {
        const {login, password, role} = req.body

        const existing = await User.findOne({login})
        if (existing) {
            return res.json({success: false, error: "Такой пользователь уже существует"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            login,
            password: hashedPassword,
            role: role || 'user',
        })

        res.json({success: true, data: {id: user._id, login: user.login, role: user.role}
        })
    } catch (error) {
        return res.json({success: false, error: error.message})
    }
}

export async function login(req, res) {
    try {
        const {login, password} = req.body

        const user = await User.findOne({login})
        if (!user) {
            return res.json({success: false, error: 'Пользователь не существует'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({success: false, error: 'Неправильный пароль'})
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            JWT_SECRET,
            {expiresIn: '7d'}
        )

        return res.json({success: true, token, user: {id: user._id, login: user.login, role: user.role}})

    } catch(error) {
        return res.json({success: false, error: error.message})
    }
}