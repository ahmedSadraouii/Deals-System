import {
  AuthenticationApi,
  Configuration as ApiAuthConfiguration,
} from 'api-auth';
import {
  ContentApi,
  Configuration as ApiContentConfiguration,
} from 'api-content';

export type GetApiClientParams = {
  ssr?: boolean;
} & (
  | {
      type: 'auth';
      refreshToken?: string;
    }
  | {
      type: 'content';
    }
);

export function getApiClient<TApiClient>(
  params: GetApiClientParams,
): TApiClient {
  if (params.type === 'auth') {
    const apiConfiguration = new ApiAuthConfiguration({
      // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
      // basePath: process.env.SHARED_API_URL,
      basePath: params.ssr ? 'https://dev.api.aldi.amplicade.com' : '/auth-api',
      headers: !!params.refreshToken
        ? {
            Cookie: `refreshToken=${params.refreshToken}`,
          }
        : undefined,
    });

    return new AuthenticationApi(apiConfiguration) as TApiClient;
  }

  const apiConfiguration = new ApiContentConfiguration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.CONTENT_API_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/umbraco',
  });

  return new ContentApi(apiConfiguration) as TApiClient;
}
