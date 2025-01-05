export class CustomErrorClass extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
  }

  toString() {
    const message = this.message ? this.message : 'No message';
    return `Error ${this.statusCode}: ${message}`;
  }
}
