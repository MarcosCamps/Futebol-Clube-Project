import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import ThrowError from './ThrowError';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

const missingToken = 'Token not found';
const invalidToken = 'Token must be a valid token';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return next(new ThrowError(404, missingToken));
  const data = jwt.verify(authorization, secret) as { data: jwt.JwtPayload };
  const { role } = JSON.parse(JSON.stringify(data));
  if (!role) return next(new ThrowError(404, invalidToken));
  return res.status(200).json({ role });
};

export default validateToken;
