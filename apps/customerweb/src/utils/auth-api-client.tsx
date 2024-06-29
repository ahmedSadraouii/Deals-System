import { AuthenticationApi, Configuration } from 'api-auth';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export interface getAuthApiClientProps {
  refreshToken?: string;
}

export function getAuthApiClient(
  props?: getAuthApiClientProps,
): AuthenticationApi {
  const baseHeaders = {
    Domain: 'ALDI_DEALS',
  };

  const apiConfiguration = new Configuration({
    basePath: process.env.AUTH_API_BASE_URL,
    headers: !!props?.refreshToken
      ? {
          ...baseHeaders,
          Cookie: `refreshToken=${props.refreshToken}`,
        }
      : baseHeaders,
    middleware: [
      {
        onError: getApiClientErrorHandler('AuthenticationApi', 'error'),
        post: getApiClientErrorHandler('AuthenticationApi', 'post'),
      },
    ],
  });

  return new AuthenticationApi(apiConfiguration);
}
