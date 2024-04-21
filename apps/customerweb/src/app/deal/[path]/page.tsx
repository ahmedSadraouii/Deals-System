import type { ContentApi } from 'api-content';
import { DealDetailPage } from '@/app/deal/[path]/deal-detail-page';
import NotFound from '@/app/not-found';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const contentApi = getApiClient<ContentApi>({
    ssr: true,
    type: 'content',
  });
  try {
    const deal = (await contentApi.getContentItemByPath20({
      path: `/content/deals/${path}/`,
    })) as UmbracoDeal;

    const supplier = (await contentApi.getContentItemById20({
      id: deal.properties?.supplier!.id!,
    })) as UmbracoSupplier;

    return <DealDetailPage deal={deal} supplier={supplier} />;
  } catch (error) {
    return <NotFound />;
  }
}
