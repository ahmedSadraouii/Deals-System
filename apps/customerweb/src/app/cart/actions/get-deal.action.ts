'use server';

import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';

export interface GetDealActionParams {
  dealId: string;
}

export async function getDealAction({
  dealId,
}: GetDealActionParams): Promise<UmbracoDeal> {
  const contentApi = getContentApiClient();
  const deal = await contentApi.getUmbracoDeal(dealId);

  if (!deal) {
    throw new Error('Deal not found');
  }

  return deal;
}
