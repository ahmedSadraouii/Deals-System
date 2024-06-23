'use server';

import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';

export interface GetDealActionParams {
  dealId: string;
}

export async function getDealAction({
  dealId,
}: GetDealActionParams): Promise<UmbracoDeal> {
  const contentApi = getContentApiClient();

  const deal = await contentApi
    .getContentItemById20({
      id: dealId,
    })
    .then((deal) => deal as UmbracoDeal);

  if (!deal) {
    throw new Error('Deal not found');
  }

  if (!verifyDealIsCorrect(deal)) {
    throw new Error('Deal is incorrect');
  }

  return deal;
}
