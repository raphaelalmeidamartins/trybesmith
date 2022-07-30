export default class UnauthorizedError extends Error {
  statusCode = 401;

  details = [{ type: 'custom' }];

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
