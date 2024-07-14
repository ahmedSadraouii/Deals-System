import type { Metadata } from 'next';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import { DealDetailPage } from '@/app/(aldi-deals)/deal/[path]/deal-detail-page';
import NotFound from '@/app/(aldi-deals)/not-found';
import { DealsSlider } from '@/components/product/deals-slider';
import { ProductItem } from '@/components/product/product-item';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
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
          // here we can actually use defaultLoader as this is server side
          defaultLoader({
            src: fixUmbracoMediaLink(picture.url),
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
  const contentDeals = await contentApi.getContent20({
    filter: ['contentType:deal'], // TODO: dont do that, pull children from item at /content/deals
  });
  const deals = contentDeals.items as UmbracoDeal[];
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

    return (
      <DealDetailPage deal={deal} supplier={supplier}>
        <DealsSlider>
          {deals.map((deal) => (
            <ProductItem key={deal.id} dealId={deal.id} />
          ))}
        </DealsSlider>
      </DealDetailPage>
    );
  } catch (error) {
    return <NotFound />;
  }
}
