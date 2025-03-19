// path: src/controllers/auth.ts
// Desc: Auth controller for handling user authentication

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}

interface AuthRequest extends Request {
    user?: JwtPayload;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send('Malformed token');
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err) {
            res.status(403).send('Invalid token');
            return;
        }
        req.user = decoded as JwtPayload; 
        next();
    });

};

export {verifyToken};