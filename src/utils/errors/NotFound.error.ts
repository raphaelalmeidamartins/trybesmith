export default class NotFoundError extends Error {
  statusCode = 404;

  details = [{ type: 'custom' }];

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
