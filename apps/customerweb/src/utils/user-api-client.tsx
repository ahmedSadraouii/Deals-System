import { UserApi, Configuration } from 'api-user';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export function getUserApiClient(): UserApi {
  const apiConfiguration = new Configuration({
    basePath: process.env.USER_API_BASE_URL,
    headers: {
      Domain: 'ALDI_DEALS',
    },
    middleware: [
      {
        onError: getApiClientErrorHandler('UserApi', 'error'),
        post: getApiClientErrorHandler('UserApi', 'post'),
      },
    ],
  });

  return new UserApi(apiConfiguration);
}
