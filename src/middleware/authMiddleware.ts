import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { JWT_SECRET } from '../services/userService';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }
       
        const decoded: any = jwt.verify(token, JWT_SECRET);
       
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
            const userId = decoded.id; 
          
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            (req as any).user = user;
            next();
        } else {
            throw new Error('Invalid token'); 
        }
    } catch (error) {
        console.error('Error while authenticating user:', error);
        res.status(500).json({ message: 'An error occurred during authentication' });
    }
};
