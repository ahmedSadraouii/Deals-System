import {
  AuthenticationApi,
  Configuration as ApiAuthConfiguration,
} from 'api-auth';
import {
  ContentApi,
  Configuration as ApiContentConfiguration,
} from 'api-content';
import { DealsApi, Configuration as ApiDealsConfiguration } from 'api-deals';
import { UserApi, Configuration as ApiUserConfiguration } from 'api-user';

export type GetApiClientParams =
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
  | {
      type: 'user';
    };

export function getApiClient<TApiClient>(
  params: GetApiClientParams,
): TApiClient {
  if (params.type === 'auth') {
    const baseHeaders = {
      Domain: 'ALDI_DEALS',
    };
    const apiConfiguration = new ApiAuthConfiguration({
      // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
      // basePath: process.env.SHARED_API_URL,
      basePath: 'https://dev.api.aldi.amplicade.com',
      headers: !!params.refreshToken
        ? {
            ...baseHeaders,
            Cookie: `refreshToken=${params.refreshToken}`,
          }
        : baseHeaders,
    });

    return new AuthenticationApi(apiConfiguration) as TApiClient;
  }

  if (params.type === 'deals') {
    const apiConfiguration = new ApiDealsConfiguration({
      basePath: 'https://dev.api.aldi.amplicade.com/ad-be',
    });

    return new DealsApi(apiConfiguration) as TApiClient;
  }

  if (params.type === 'user') {
    const apiConfiguration = new ApiUserConfiguration({
      basePath: 'https://dev.api.aldi.amplicade.com/',
    });

    return new UserApi(apiConfiguration) as TApiClient;
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
