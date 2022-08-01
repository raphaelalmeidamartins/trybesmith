import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import CustomError from '../types/CustomError.types';

export default function authErrorMiddleware(
  err:
  | TokenExpiredError
  | NotBeforeError
  | JsonWebTokenError
  | CustomError
  | ValidationError
  | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name } = err;
  switch (true) {
    case ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(name):
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      break;
    default: next(err); break;
  }
}
