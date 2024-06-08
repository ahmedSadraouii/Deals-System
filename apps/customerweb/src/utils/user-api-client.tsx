import { UserApi, Configuration } from 'api-user';

export function getUserApiClient(): UserApi {
  const apiConfiguration = new Configuration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.USER_API_BASE_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/',
    headers: {
      Domain: 'ALDI_DEALS',
    },
  });

  return new UserApi(apiConfiguration);
}
