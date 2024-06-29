import { verifySupplierIsCorrect } from './verify-supplier-is-correct';
import { ContentApi, Configuration } from 'api-content';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getApiClientErrorHandler } from '@/utils/catch-api-error';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';

export class DealsContentApi extends ContentApi {
  public async getUmbracoDeal(dealId: string): Promise<UmbracoDeal | null> {
    const dealContent = await this.getContentItemById20({
      id: dealId,
    });
    const fullDeal = dealContent as UmbracoDeal;

    if (!verifyDealIsCorrect(fullDeal)) {
      console.log('Deal is incorrect', fullDeal);
      return null;
    }

    return fullDeal;
  }

  public async getUmbracoSupplierByDeal(
    deal: UmbracoDeal,
  ): Promise<UmbracoSupplier | null> {
    return await this.getUmbracoSupplier(deal.properties?.supplier!.id!);
  }

  public async getUmbracoSupplier(
    supplierId: string,
  ): Promise<UmbracoSupplier | null> {
    const supplierContent = await this.getContentItemById20({
      id: supplierId,
    });

    const fullSupplier = supplierContent as UmbracoSupplier;

    if (!verifySupplierIsCorrect(fullSupplier)) {
      console.log('Supplier is incorrect', fullSupplier);
      return null;
    }

    return fullSupplier;
  }
}

export function getContentApiClient(): DealsContentApi {
  const apiConfiguration = new Configuration({
    basePath: process.env.CONTENT_API_BASE_URL,
    middleware: [
      {
        onError: getApiClientErrorHandler('ContentApi', 'error'),
        post: getApiClientErrorHandler('ContentApi', 'post'),
      },
    ],
  });

  return new DealsContentApi(apiConfiguration);
}
