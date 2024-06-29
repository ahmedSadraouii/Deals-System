import type { Metadata } from 'next';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import { DealDetailPage } from '@/app/deal/[path]/deal-detail-page';
import NotFound from '@/app/not-found';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

type Props = {
  params: { path: string };
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params: { path },
}: Props): Promise<Metadata> {
  const contentApi = getContentApiClient();

  try {
    const deal = (await contentApi.getContentItemByPath20({
      path: `/content/deals/${path}/`,
    })) as UmbracoDeal;

    const productImages =
      deal.properties?.pictures
        ?.filter((picture) => !!picture.url)
        ?.map((picture) =>
          // TODO: use config here....
          defaultLoader({
            src: `${process.env.CONTENT_API_BASE_URL}${picture.url}`,
            width: 1280,
            config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
          }),
        ) ?? [];

    return {
      title: `ALDI Deals - ${deal.name}`,
      description: deal.properties?.description,
      openGraph: {
        images: productImages,
      },
    };
  } catch (error) {
    console.error('Unable to generate Deal Metadata', error);
    return {};
  }
}

export default async function Page({ params: { path } }: Props) {
  const contentApi = getContentApiClient();

  try {
    const deal = (await contentApi.getContentItemByPath20({
      path: `/content/deals/${path}/`,
    })) as UmbracoDeal;

    if (!verifyDealIsCorrect(deal)) {
      console.log('Deal is incorrect, showing NotFound page');
      return <NotFound />;
    }

    const supplier = (await contentApi.getContentItemById20({
      id: deal.properties?.supplier!.id!,
    })) as UmbracoSupplier;

    if (!verifySupplierIsCorrect(supplier)) {
      console.log('Supplier is incorrect, showing NotFound page');
      return <NotFound />;
    }

    return <DealDetailPage deal={deal} supplier={supplier} />;
  } catch (error) {
    return <NotFound />;
  }
}
