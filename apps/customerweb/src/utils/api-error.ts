import type {
  UniversalErrorContext,
  UniversalResponseContext,
} from '@/utils/catch-api-error';

/**
 * Basically a regular error with everything, an error comes with AND that has a innerError property
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly errorResponse?: any,
    public readonly innerError?: Error,
    public readonly context?: UniversalResponseContext | UniversalErrorContext,
  ) {
    super(message);
    this.innerError = innerError;
  }

  toString(): string {
    return `${super.toString()}\nInner Error: ${this.innerError?.toString()}\nError Response: ${JSON.stringify(
      this.errorResponse,
      null,
      2,
    )}\nContext: ${JSON.stringify(this.context, null, 2)}`;
  }
}
