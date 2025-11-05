import {User} from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = "supersecret"

export async function Register(req, res) {
    try {
        const {login, password, role} = req.body

        const existing = User.findOne({login})
        if (existing) {
            return res.json({success: false, error: "User already exist"})
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

        const user = User.findOne({login})
        if (!user) {
            return res.json({success: false, error: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({success: false, error: 'Wrong Password'})
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.json({success: true, token, user: {id: user._id, login: user.login, role: user.role}})

    } catch(error) {
        return res.json({success: false, error: error.message})
    }
}