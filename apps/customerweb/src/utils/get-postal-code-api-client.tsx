import { Configuration, PostalCodeApi } from 'api-auth';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export function getPostalCodeApiClient(): PostalCodeApi {
  const apiConfiguration = new Configuration({
    basePath: process.env.AUTH_API_BASE_URL,
    headers: {
      Domain: 'ALDI_DEALS',
    },
    middleware: [
      {
        onError: getApiClientErrorHandler('PostalCodeApi', 'error'),
        post: getApiClientErrorHandler('PostalCodeApi', 'post'),
      },
    ],
  });

  return new PostalCodeApi(apiConfiguration);
}
