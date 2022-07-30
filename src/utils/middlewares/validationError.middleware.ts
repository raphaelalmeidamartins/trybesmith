import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import CustomError from '../types/CustomError.types';

export default function validationErrorMiddleware(
  err: ValidationError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const [{ type }] = err.details;
  switch (true) {
    case type === 'any.required':
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      break;
    case type.includes('string') || type.includes('number'):
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: err.message });
      break;
    default: next(err); break;
  }
}

/* Refatorei para utilizar o type dos erros por sugestão do Leo Araujo - 19A */
