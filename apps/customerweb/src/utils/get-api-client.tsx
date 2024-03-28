import {
  AuthenticationApi,
  Configuration as ApiAuthConfiguration,
} from 'api-auth';
import {
  ContentApi,
  Configuration as ApiContentConfiguration,
} from 'api-content';

export type GetApiClientParams =
  | {
      type: 'auth';
      refreshToken?: string;
    }
  | {
      type: 'content';
    };

export function getApiClient<TApiClient>(
  params: GetApiClientParams,
): TApiClient {
  if (params.type === 'auth') {
    const apiConfiguration = new ApiAuthConfiguration({
      basePath: 'https://dev.api.aldi.amplicade.com/',
      headers: !!params.refreshToken
        ? {
            Cookie: `refreshToken=${params.refreshToken}`,
          }
        : undefined,
    });

    return new AuthenticationApi(apiConfiguration) as TApiClient;
  }

  const apiConfiguration = new ApiContentConfiguration({
    basePath: 'http://localhost:4430',
  });

  return new ContentApi(apiConfiguration) as TApiClient;
}
