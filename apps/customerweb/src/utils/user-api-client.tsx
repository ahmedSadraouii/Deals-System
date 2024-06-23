import { UserApi, Configuration } from 'api-user';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export function getUserApiClient(): UserApi {
  const apiConfiguration = new Configuration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.USER_API_BASE_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/',
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
