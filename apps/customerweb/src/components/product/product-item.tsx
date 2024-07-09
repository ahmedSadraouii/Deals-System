import React from 'react';
import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { getContentApiClient } from '@/utils/content-api-client';

export interface ProductItemProps {
  dealId: string;
}

export async function ProductItem({ dealId }: ProductItemProps) {
  const contentApi = getContentApiClient();
  const fullDeal = await contentApi.getUmbracoDeal(dealId);
  if (!fullDeal) {
    return null;
  }
  const fullSupplier = await contentApi.getUmbracoSupplierByDeal(fullDeal);

  if (!fullSupplier) {
    return null;
  }

  return <DealsListItemGrid deal={fullDeal} supplier={fullSupplier} />;
}
