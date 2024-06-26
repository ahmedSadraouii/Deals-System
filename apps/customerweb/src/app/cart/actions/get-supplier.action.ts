'use server';

import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';

export interface GetSupplierActionParams {
  supplierId: string;
}

export async function getSupplierAction({
  supplierId,
}: GetSupplierActionParams): Promise<UmbracoSupplier> {
  const contentApi = getContentApiClient();

  const supplier = await contentApi.getUmbracoSupplier(supplierId);

  if (!supplier) {
    throw new Error('Supplier not found');
  }

  return supplier;
}
