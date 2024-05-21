import { DealsApi, Configuration } from 'api-deals';

export interface getDealsApiClientProps {
  accessToken?: string;
}

export function getDealsApiClient({
  accessToken,
}: getDealsApiClientProps): DealsApi {
  const apiConfiguration = new Configuration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.ADBE_API_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/ad-be',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return new DealsApi(apiConfiguration);
}
