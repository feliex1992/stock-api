import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { Database } from '../../infrastructure/database';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) : any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

  if (token == null) return res.status(401).json({
    error: {
      message: 'Unauthorize!'
    }
  });  // No token present

  jwt.verify(token, process.env.JWT_SECRET!, (err, data: any) => {
      if (err) return res.status(403).json({
        error: {
          message: 'Invalid token!'
        }
      });  // Invalid token
      const user: User  = {
        id: data["id"] || '-',
        user_name: data["user_name"] || '-',
        full_name: data["full_name"] || '-',
        phone: data["phone"] || '-'
      }
      Database.setUser(user);
      next();
  });
};