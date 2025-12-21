import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({success: true, error: 'Нет токена'})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.json({success: false, error: "Неверный токен"});
    }
}