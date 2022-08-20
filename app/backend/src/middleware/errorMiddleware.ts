import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('errorMiddleware');
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'hello babe' });
};

export default errorMiddleware;
