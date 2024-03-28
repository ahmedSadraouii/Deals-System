import { useMemo } from 'react';
import type { GetApiClientParams } from '@/utils/get-api-client';
import { getApiClient } from '@/utils/get-api-client';

export function useApiClient<TApiClient>(
  params: GetApiClientParams,
): TApiClient {
  return useMemo(() => getApiClient<TApiClient>(params), [params]);
}
