import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecret';

export function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({success: false, error: 'No token'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.json({success: false, error: "Invalid token"});
    }
}