import { ApiError } from '@/utils/api-error';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';

export async function catchApiError<TError = any>(
  error: TError,
): Promise<TError> {
  const _error = error as any;
  // get content length
  if (_error?.response?.headers?.get('content-length') === '0') {
    throw new Error(`Empty response (status = ${_error.response.status})`);
  }
  if (_error?.response?.json) {
    const errorResponse = await (error as any).response.json();

    if ('type' in errorResponse && 'status' in errorResponse) {
      // this is a nice error message from the server
      // we got type, title, status (number), detail and traceId
      throw new ApiError(
        `ApiError found (JSON). type = '${errorResponse.type}', title = '${errorResponse.title}', status = '${errorResponse.status}', detail = '${errorResponse.detail}', traceId = '${errorResponse.traceId}'`,
        _error,
      );
    }

    const apiError = tryParseApiErrorWithFallback(errorResponse);
    throw new ApiError(
      `ApiError found (JSON). errorCode = '${apiError.errorCode}', message = '${apiError.message}'`,
      _error,
    );
  }
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(String(error));
}
