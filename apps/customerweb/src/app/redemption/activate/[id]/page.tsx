import NotFound from '@/app/not-found';
import CardActivation from '@/components/redemption/redemption-activate-card';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

type Props = {
  params: { id: string };
};

export default async function Page({ params: { id } }: Props) {
  const contentApi = getContentApiClient();

  try {
    const deal = (await contentApi.getContentItemById({
      id: id,
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
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="mb-6">
          <h1 className="text-center text-4xl font-bold text-secondary">
            Deal aktivieren
          </h1>
        </div>
        <CardActivation deal={deal} supplier={supplier} />
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
}
