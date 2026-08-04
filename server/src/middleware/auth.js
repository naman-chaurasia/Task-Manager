import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protect = async (req, res, next) => {
    try {
        let token;
        
        // 1. Check for token in cookies (httpOnly cookie)
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } 
        // 2. Fallback to Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret_dev');
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }

        req.user = { id: user._id, name: user.name, email: user.email };
        req.userId = user._id.toString();
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

export default protect;