import { Suspense } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import { AldiCard } from '../nextui/aldi-card';
import { CardBody } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { AldiButton } from '@/components/nextui/aldi-button';
import CopyableInput from '@/components/redeem/copy-input';
import { IconArrowUpRight } from '@/components/svg/icon-arrow-up-right';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

interface HonoredDeal {
  dealId?: string;
  pin?: string | null;
  code?: string | null;
  serial?: string | null;
  createdAt?: Date;
  email?: string | null;
}

// interface for the component props
interface DealCheckoutCardProps {
  deal: HonoredDeal;
}
export default async function DealCheckoutCard({
  deal,
}: DealCheckoutCardProps) {
  if (!deal.dealId) {
    console.error('Deal ID is undefined');
    return null;
  }
  const contentApi = getContentApiClient();

  let dealContent;
  try {
    dealContent = await contentApi.getContentItemById20({
      id: deal.dealId,
    });
  } catch (error) {
    console.error('Error fetching deal content:', error);
    return null;
  }

  const fullDeal = dealContent as UmbracoDeal;

  if (!verifyDealIsCorrect(fullDeal)) {
    console.log('Deal is incorrect', fullDeal);
    return null;
  }

  const description = fullDeal.properties?.description;

  let supplierContent;
  try {
    supplierContent = await contentApi.getContentItemById20({
      id: fullDeal.properties?.supplier!.id!,
    });
  } catch (error) {
    console.error('Error fetching supplier content:', error);
    return null;
  }

  const fullSupplier = supplierContent as UmbracoSupplier;

  if (!verifySupplierIsCorrect(fullSupplier)) {
    console.log('Supplier is incorrect', fullSupplier);
    return null;
  }
  const primaryImage = fullDeal.properties?.pictures?.[0]?.url;
  const supplierImage = fullSupplier.properties?.picture?.[0]?.url;

  const productImageUrl =
    primaryImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${primaryImage}`,
      width: 768,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${supplierImage}`,
      width: 256,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  const promotionStart = DateTime.fromISO(fullDeal.properties?.promotionStart!);
  const promotionEnd = DateTime.fromISO(fullDeal.properties?.promotionEnd!);
  return (
    <Suspense>
      <AldiCard className="rounded-xl">
        <CardBody className="flex flex-col gap-8 p-4 md:flex-row md:p-10">
          <div className="w-full md:w-2/3 lg:w-1/3 ">
            <Image
              className="h-full w-full rounded-xl md:h-2/3 xl:h-full"
              src={productImageUrl!}
              alt={fullDeal.name}
              width={420}
              height={378}
            />
          </div>
          <div
            className={`flex flex-1 flex-col gap-6 ${
              deal.code !== '' ? 'justify-between' : ''
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white p-2">
                <Image
                  className="md:max-h-72 lg:h-full"
                  src={supplierImageUrl!}
                  alt={fullSupplier.name}
                  width={100}
                  height={65}
                />
              </div>
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary ">
                    {fullDeal.name}
                  </h1>
                  <p className="max-w-[300px] text-lg leading-5 text-aldi-blue">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            {deal.code !== '' ? <CopyableInput value={deal.code || ''} /> : ''}
            <div>
              <p className=" border-t-2 pb-2 pt-4 text-aldi-blue opacity-50">
                Gültig ab:{' '}
                {promotionStart.isValid
                  ? promotionStart.toLocaleString(DateTime.DATE_SHORT)
                  : 'unbekannt'}{' '}
              </p>
              <p className="border-b-2 pb-4 text-aldi-blue opacity-50">
                Gültig bis:{' '}
                {promotionEnd.isValid
                  ? promotionEnd.toLocaleString(DateTime.DATE_SHORT)
                  : 'unbekannt'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <AldiButton
                size="lg"
                variant="solid"
                href="/auth"
                className="w-full font-light md:max-w-72"
                endContent={<IconArrowUpRight className="text-2xl" />}
                color="secondary"
              >
                Gutscheincode einlösen
              </AldiButton>
              <AldiButton
                size="lg"
                variant="ghost"
                href="/profile/deals"
                color="secondary"
                as={Link}
              >
                Im Profil ansehen
              </AldiButton>
            </div>
          </div>
        </CardBody>
      </AldiCard>
    </Suspense>
  );
}
