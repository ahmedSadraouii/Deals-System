import type { Response } from 'next/dist/compiled/@edge-runtime/primitives';
import type { FetchAPI } from 'api-user';
import { ApiError } from '@/utils/api-error';

export interface UniversalErrorContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
  error: unknown;
  response?: Response;
}

export interface UniversalResponseContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
  response: Response;
}

export function getApiClientErrorHandler(
  hint: string,
  type: 'error' | 'post' = 'post',
): (
  context: UniversalErrorContext | UniversalResponseContext,
) => Promise<void> {
  return async (context: UniversalErrorContext | UniversalResponseContext) => {
    if (type === 'post') {
      const responseContext = context as UniversalResponseContext;
      const { response } = responseContext;

      if (!response) {
        return;
      }

      if (response.status < 200 || response.status >= 300) {
        // check if we have a content length
        if (response.headers.get('content-length') === '0') {
          throw new ApiError(`[${hint}] ApiError`, undefined, responseContext);
        }

        if (
          response.headers.get('content-type')?.includes('application/json')
        ) {
          const responseJson = await response.json();
          throw new ApiError(
            `[${hint}] ApiError`,
            undefined,
            responseContext,
            JSON.stringify(responseJson),
          );
        }

        const responseText = await response.text();
        throw new ApiError(
          `[${hint}] ApiError (text) for '${responseContext.url}'\nStatus: ${response.status}\nResponse: ${responseText}`,
          undefined,
          responseContext,
          responseText,
        );
      }

      return;
    }

    const errorContext = context as UniversalErrorContext;

    throw new ApiError(
      `[${hint}] ApiError (error) for '${errorContext.url}'`,
      errorContext.error as Error,
      errorContext,
    );
  };
}
