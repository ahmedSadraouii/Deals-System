import {
  DealsApi,
  Configuration,
  FavoritesApi,
  OrdersApi,
  HonoredDealsApi,
  CartsApi,
  VoucherApi,
} from 'api-deals';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export interface AdBeApiClientProps {
  accessToken?: string;
}

export function getAdBeApiConfiguration(
  params?: AdBeApiClientProps,
): Configuration {
  return new Configuration({
    // TODO: use env var as soon the http://192.168.179.20:5000/aldi/infrastructure/k8s/-/merge_requests/7 is merged
    // basePath: process.env.ADBE_API_BASE_URL,
    basePath: 'https://dev.api.aldi.amplicade.com',
    headers: !!params?.accessToken
      ? {
          Authorization: `Bearer ${params?.accessToken}`,
        }
      : undefined,
    middleware: [
      {
        onError: getApiClientErrorHandler('AdBeApi', 'error'),
        post: getApiClientErrorHandler('AdBeApi', 'post'),
      },
    ],
  });
}

export function getDealsApiClient(params: AdBeApiClientProps): DealsApi {
  return new DealsApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('DealsApi', 'error'),
    post: getApiClientErrorHandler('DealsApi', 'post'),
  });
}

export function getOrdersApiClient(params: AdBeApiClientProps): OrdersApi {
  return new OrdersApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('OrdersApi', 'error'),
    post: getApiClientErrorHandler('OrdersApi', 'post'),
  });
}

export function getCartsApiClient(params: AdBeApiClientProps): CartsApi {
  return new CartsApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('CartsApi', 'error'),
    post: getApiClientErrorHandler('CartsApi', 'post'),
  });
}

export function getHonoredDealsApiClient(
  params: AdBeApiClientProps,
): HonoredDealsApi {
  return new HonoredDealsApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('HonoredDealsApi', 'error'),
    post: getApiClientErrorHandler('HonoredDealsApi', 'post'),
  });
}

export function getFavoritesApiClient(
  params?: AdBeApiClientProps,
): FavoritesApi {
  return new FavoritesApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('FavoritesApi', 'error'),
    post: getApiClientErrorHandler('FavoritesApi', 'post'),
  });
}

export function getVoucherApiClient(params?: AdBeApiClientProps): VoucherApi {
  return new VoucherApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('VoucherApi', 'error'),
    post: getApiClientErrorHandler('VoucherApi', 'post'),
  });
}
