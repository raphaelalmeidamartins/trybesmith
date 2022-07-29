import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../types/CustomError.types';

export default function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const { statusCode, message } = err;

  if (statusCode) {
    res.status(statusCode).json({ message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}
