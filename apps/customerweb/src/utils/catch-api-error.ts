import { ApiError } from '@/utils/api-error';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';

export async function catchApiError<TError = any>(
  error: TError,
): Promise<TError> {
  const _error = error as any;
  if (_error?.response?.json) {
    const errorResponse = await (error as any).response.json();
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
