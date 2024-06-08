export class DefaultError extends Error {
  constructor(message: string = 'Something went wrong') {
    super(message);
    this.name = 'DefaultError';
  }
}
