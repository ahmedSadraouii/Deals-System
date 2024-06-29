import * as util from 'node:util';
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
    public readonly innerError?: Error,
    public readonly context?: UniversalResponseContext | UniversalErrorContext,
    public readonly responseText?: string,
  ) {
    super(
      ApiError.formatErrorMessage(message, innerError, context, responseText),
    );
    this.innerError = innerError;
  }

  static formatErrorMessage(
    message: string,
    innerError?: Error,
    context?: UniversalResponseContext | UniversalErrorContext,
    responseText?: string,
  ): string {
    const apiErrorLines = [];
    apiErrorLines.push(`[ApiError] Message: ${message}`);
    if (innerError) {
      apiErrorLines.push(`Inner Error: ${innerError}`);
    }
    if (context) {
      if ('error' in context) {
        const errorContext = context as UniversalErrorContext;
        if (errorContext) {
          apiErrorLines.push(`Error Context: ${errorContext.error}`);
        }
      }

      const { method = 'UKNONWN', body } = context.init;

      apiErrorLines.push(`Request: ${method} on ${context.url}`);
      if (body) {
        apiErrorLines.push(
          `Request Body: ${util.inspect(body, { depth: 2, colors: false })}`,
        );
      }

      const { response } = context;
      if (response) {
        const contentType = response.headers.get('content-type');
        apiErrorLines.push('Response:');
        apiErrorLines.push(`Status: ${response.status}`);
        apiErrorLines.push(`Content-Type: ${contentType}`);

        apiErrorLines.push(`Response: ${responseText}`);
      }
    }
    return apiErrorLines.join('\n');
  }
}
