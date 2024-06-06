import { DealsApi, Configuration, FavoritesApi } from 'api-deals';

export interface AdBeApiClientProps {
  accessToken?: string;
}

export function getAdBeApiConfiguration(
  params?: AdBeApiClientProps,
): Configuration {
  return new Configuration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.ADBE_API_BASE_URL,
    basePath: 'https://dev.api.aldi.amplicade.com/ad-be',
    headers: params?.accessToken
      ? {
          Authorization: `Bearer ${params?.accessToken}`,
        }
      : undefined,
  });
}

export function getDealsApiClient(params: AdBeApiClientProps): DealsApi {
  return new DealsApi(getAdBeApiConfiguration(params));
}

export function getFavoritesApiClient(
  params?: AdBeApiClientProps,
): FavoritesApi {
  return new FavoritesApi(getAdBeApiConfiguration(params));
}
