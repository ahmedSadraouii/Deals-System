import React from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import type { OrderItemModel } from 'api-deals';
import { DateTime } from 'luxon';
import { CodeField } from '@/app/profile/deals/code-field';
import { getContentApiClient } from '@/utils/content-api-client';

export interface CheckoutOrderItemProps {
  orderItemModel: OrderItemModel;
}
export async function CheckoutOrderItem({
  orderItemModel,
}: CheckoutOrderItemProps) {
  const contentApi = getContentApiClient();

  const umbracoDeal = await contentApi.getUmbracoDeal(orderItemModel.dealId);
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

  const primaryImage = umbracoDeal.properties?.pictures?.[0]?.url;
  const supplierImage = umbracoSupplier.properties?.picture?.[0]?.url;

  const productImageUrl =
    primaryImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${primaryImage}`,
      width: 768,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${supplierImage}`,
      width: 256,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  const promotionStart = DateTime.fromISO(
    umbracoDeal.properties?.promotionStart!,
  );
  const promotionEnd = DateTime.fromISO(umbracoDeal.properties?.promotionEnd!);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4 rounded-[20px] bg-default-100 p-4 lg:flex-row lg:gap-10 lg:p-10">
      <div
        className="aspect-square w-full shrink-0 rounded-[12px] bg-cover bg-center lg:min-w-[420px]"
        style={{
          backgroundImage: `url(${productImageUrl})`,
        }}
      />
      <div className="flex grow flex-col gap-8">
        <div className="flex flex-row items-center gap-6">
          <div className="shrink-0 overflow-hidden rounded-[20px] bg-neutral-200 p-2">
            <div
              className="h-20 w-20 bg-contain bg-clip-content bg-center bg-no-repeat bg-origin-content"
              style={{
                backgroundImage: supplierImageUrl && `url(${supplierImageUrl})`,
              }}
            />
          </div>
          <div className="grow">
            <h1 className="text-2xl font-bold text-secondary">
              {umbracoSupplier.name}
            </h1>
            <h2 className="text-lg text-secondary">{umbracoDeal.name}</h2>
          </div>
        </div>
        <div>
          <CodeField code="what?" fullWidth={true} />
        </div>
        <div className="border-y border-secondary/10 py-4 text-secondary/50">
          Gültig ab: {promotionStart.toFormat('dd.MM.yyyy')} - Gültig bis:{' '}
          {promotionEnd.toFormat('dd.MM.yyyy')}
        </div>
      </div>
    </div>
  );
}
