import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../types/CustomError.types';

export default function validationErrorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name, message } = err;

  if (name !== 'ValidationError') {
    next(err);
  }

  if (message.includes('required')) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  } else {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }
}
