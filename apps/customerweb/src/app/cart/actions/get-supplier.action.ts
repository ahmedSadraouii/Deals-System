'use server';

import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

export interface GetSupplierActionParams {
  supplierId: string;
}

export async function getSupplierAction({
  supplierId,
}: GetSupplierActionParams): Promise<UmbracoSupplier> {
  const contentApi = getContentApiClient();

  const supplier = await contentApi
    .getContentItemById20({
      id: supplierId,
    })
    .then((Supplier) => Supplier as UmbracoSupplier);

  if (!supplier) {
    throw new Error('Supplier not found');
  }

  if (!verifySupplierIsCorrect(supplier)) {
    throw new Error('Supplier is incorrect');
  }

  return supplier;
}
