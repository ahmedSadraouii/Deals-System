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
  return async (
    requestContext: UniversalErrorContext | UniversalResponseContext,
  ) => {
    if (type === 'post') {
      const responseContext = requestContext as UniversalResponseContext;
      const { response } = responseContext;
      if (!response) {
        return;
      }

      if (response.status < 200 || response.status >= 300) {
        // check if we have a content length
        if (response.headers.get('content-length') === '0') {
          throw new ApiError(
            `[${hint}] ApiError (empty) for '${requestContext.url}'\nStatus: ${response.status}`,
            undefined,
            undefined,
            requestContext,
          );
        }

        if (
          response.headers.get('content-type')?.includes('application/json')
        ) {
          const responseJson = await response.json();
          throw new ApiError(
            `[${hint}] ApiError (json) for '${requestContext.url}'\nStatus: ${response.status}\nResponse: ${JSON.stringify(responseJson, null, 2)}`,
            responseJson,
            undefined,
            requestContext,
          );
        }

        const responseText = await response.text();
        throw new ApiError(
          `[${hint}] ApiError (text) for '${requestContext.url}'\nStatus: ${response.status}\nResponse: ${responseText}`,
          responseText,
          undefined,
          requestContext,
        );
      }

      return;
    }

    const errorContext = requestContext as UniversalErrorContext;

    throw new ApiError(
      `[${hint}] ApiError (error) for '${requestContext.url}'`,
      undefined,
      errorContext.error as Error,
      requestContext,
    );
  };
}
