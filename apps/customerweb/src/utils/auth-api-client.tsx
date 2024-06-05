import { AuthenticationApi, Configuration } from 'api-auth';

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
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.ADBE_API_URL,
    basePath: 'https://dev.api.aldi.amplicade.com',
    headers: !!props?.refreshToken
      ? {
          ...baseHeaders,
          Cookie: `refreshToken=${props.refreshToken}`,
        }
      : baseHeaders,
  });

  return new AuthenticationApi(apiConfiguration);
}
