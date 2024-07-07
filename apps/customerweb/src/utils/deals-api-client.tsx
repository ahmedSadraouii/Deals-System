import {
  DealsApi,
  Configuration,
  FavoritesApi,
  OrdersApi,
  HonoredDealsApi,
  CartsApi,
  VoucherApi,
  AccountApi,
} from 'api-deals';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';

export interface AdBeApiClientProps {
  accessToken?: string;
}

export function getAdBeApiConfiguration(
  params?: AdBeApiClientProps,
): Configuration {
  return new Configuration({
    basePath: process.env.ADBE_API_BASE_URL,
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

export function getAccountApiClient(params: AdBeApiClientProps): AccountApi {
  return new AccountApi(getAdBeApiConfiguration(params)).withMiddleware({
    onError: getApiClientErrorHandler('AccountApi', 'error'),
    post: getApiClientErrorHandler('AccountApi', 'post'),
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
