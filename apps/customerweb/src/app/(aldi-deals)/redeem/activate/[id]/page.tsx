import NotFound from '@/app/(aldi-deals)/not-found';
import CardActivation from '@/components/redeem/redemption-activate-card';
import { RedemptionSteps } from '@/components/redeem/redemption-steps';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

type Props = {
  params: { id: string };
  searchParams: { email: string; pinCode: string };
};

export default async function Page({
  params: { id },
  searchParams: { email, pinCode },
}: Props) {
  const contentApi = getContentApiClient();

  try {
    const deal = (await contentApi.getContentItemById({ id })) as UmbracoDeal;

    if (!verifyDealIsCorrect(deal)) {
      console.log('Deal is incorrect, showing NotFound page');
      return <NotFound />;
    }

    const supplier = (await contentApi.getContentItemById({
      id: deal.properties?.supplier!.id!,
    })) as UmbracoSupplier;

    if (!verifySupplierIsCorrect(supplier)) {
      console.log('Supplier is incorrect, showing NotFound page');
      return <NotFound />;
    }

    return (
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <RedemptionSteps />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="mb-6">
            <h1 className="text-center text-4xl font-bold text-secondary">
              Deal aktivieren
            </h1>
          </div>
          <CardActivation
            deal={deal}
            supplier={supplier}
            email={email}
            pinCode={pinCode}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
}
