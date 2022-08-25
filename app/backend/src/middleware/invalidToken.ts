import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'secret';

const tokenInvalid = async (req: any, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, secret);
  next();
};

export default tokenInvalid;
