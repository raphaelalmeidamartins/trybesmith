export default class CustomGenericError extends Error {
  details = [{ type: 'custom' }];

  constructor(message: string, public statusCode: number, public name: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}
