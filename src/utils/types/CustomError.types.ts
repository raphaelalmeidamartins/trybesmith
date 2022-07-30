import { ValidationErrorItem } from 'joi';

interface CustomError extends Error {
  statusCode?: number;
  details: ValidationErrorItem[];
}

export default CustomError;
