interface CustomError extends Error {
  statusCode?: number;
}

export default CustomError;
