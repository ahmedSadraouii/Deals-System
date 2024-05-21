/**
 * Basically a regular error with everything, an error comes with AND that has a innerError property
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly innerError?: Error,
  ) {
    super(message);
    this.innerError = innerError;
  }
}
