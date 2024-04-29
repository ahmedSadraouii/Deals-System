import {
  AuthenticationApi,
  Configuration as ApiAuthConfiguration,
} from 'api-auth';
import {
  ContentApi,
  Configuration as ApiContentConfiguration,
} from 'api-content';
import { DealsApi, Configuration as ApiDealsConfiguration } from 'api-deals';

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
  | {
      type: 'deals';
      accessToken?: string;
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

  if (params.type === 'deals') {
    const apiConfiguration = new ApiDealsConfiguration({
      basePath: 'https://dev.api.aldi.amplicade.com/ad-be',
    });

    return new DealsApi(apiConfiguration) as TApiClient;
  }

  const apiConfiguration = new ApiContentConfiguration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.CONTENT_API_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/umbraco',
  });

  return new ContentApi(apiConfiguration) as TApiClient;
}

export interface getDealsApiClientProps {
  accessToken?: string;
}

export function getDealsApiClient({
  accessToken,
}: getDealsApiClientProps): DealsApi {
  const apiConfiguration = new ApiDealsConfiguration({
    basePath: 'https://dev.api.aldi.amplicade.com/ad-be',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return new DealsApi(apiConfiguration);
}
