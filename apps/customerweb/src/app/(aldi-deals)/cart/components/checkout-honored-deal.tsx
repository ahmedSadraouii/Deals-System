import React from 'react';
import Image from 'next/image';
import { ThankYouDetails } from './thankyou-details';
import type { HonoredDealModel } from 'api-deals';
import { DateTime } from 'luxon';
import { CodeField } from '@/app/(aldi-deals)/profile/deals/code-field';
import { getContentApiClient } from '@/utils/content-api-client';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';

export interface CheckoutHonoredDealProps {
  honoredDealModel: HonoredDealModel;
}
export async function CheckoutHonoredDeal({
  honoredDealModel,
}: CheckoutHonoredDealProps) {
  const contentApi = getContentApiClient();

  const umbracoDeal = await contentApi.getUmbracoDeal(honoredDealModel.dealId);
  if (!umbracoDeal) {
    return <div>Deal not found</div>;
  }

  if (!umbracoDeal.properties?.supplier.id) {
    return <div>Supplier ID not found</div>;
  }

  const umbracoSupplier = await contentApi.getUmbracoSupplier(
    umbracoDeal.properties?.supplier.id,
  );

  if (!umbracoSupplier) {
    return <div>Supplier not found</div>;
  }

  const primaryImage =
    umbracoDeal.properties?.pictures?.[0]?.url &&
    fixUmbracoMediaLink(umbracoDeal.properties?.pictures?.[0]?.url);
  const supplierImage =
    umbracoSupplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(umbracoSupplier.properties?.picture?.[0]?.url);

  const promotionStart = DateTime.fromISO(
    umbracoDeal.properties?.promotionStart!,
  );
  const promotionEnd = DateTime.fromISO(umbracoDeal.properties?.promotionEnd!);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4 rounded-[20px] bg-default-100 p-4 lg:flex-row lg:gap-10 lg:p-10">
      {primaryImage && (
        <Image
          className="aspect-square w-full shrink-0 rounded-[12px] bg-cover bg-center lg:max-w-[420px]"
          src={primaryImage}
          alt="Deal Image"
          width={768}
          height={768}
        />
      )}
      <div className="flex grow flex-col gap-8">
        <div className="flex flex-row items-center gap-6">
          <div className="shrink-0 overflow-hidden rounded-[20px] bg-neutral-200 p-2">
            {supplierImage && (
              <Image
                className="h-20 w-20 bg-contain bg-clip-content bg-center bg-no-repeat bg-origin-content"
                src={supplierImage}
                alt="Supplier Image"
                width={80}
                height={80}
              />
            )}
          </div>
          <ThankYouDetails
            supplierName={umbracoSupplier.name}
            dealName={umbracoDeal.name}
          />
        </div>
        <div>
          <CodeField code={honoredDealModel.code} fullWidth={true} />
        </div>
        <div className="border-y border-secondary/10 py-4 text-secondary/50">
          Gültig ab: {promotionStart.toFormat('dd.MM.yyyy')} - Gültig bis:{' '}
          {promotionEnd.toFormat('dd.MM.yyyy')}
          <br />
          Seriennummer: {honoredDealModel.serial}
        </div>
      </div>
    </div>
  );
}
