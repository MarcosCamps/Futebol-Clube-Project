import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  if (message === 'jwt malformed') {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
