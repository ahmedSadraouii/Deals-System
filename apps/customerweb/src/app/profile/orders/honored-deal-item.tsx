import React from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import type { HonoredDealModel } from 'api-deals';
import { DateTime } from 'luxon';
import { CodeField } from '@/app/profile/orders/code-field';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';

export interface HonoredDealItemProps {
  deal: UmbracoDeal;
  supplier: UmbracoSupplier;
  honoredDeal: HonoredDealModel;
}
export function HonoredDealItem({
  deal,
  supplier,
  honoredDeal,
}: HonoredDealItemProps) {
  const primaryImage = deal.properties?.pictures?.[0]?.url;
  const supplierImage = supplier.properties?.picture?.[0]?.url;
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

  const validTill = DateTime.fromISO(deal.properties?.promotionEnd!);
  const now = DateTime.now();

  return (
    <div
      className="flex h-32 flex-row items-center gap-6 border-b border-gray-200 py-6"
      key={honoredDeal.id}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-[20px] bg-gray-200">
        <Image
          src={supplierImageUrl!}
          alt={supplier.name}
          width={88}
          height={88}
          objectFit="contain"
          className="shrink-0"
        />
      </div>
      <div className="flex grow flex-col gap-2">
        <h2 className="text-lg font-medium text-secondary">{deal.name}</h2>
        {validTill.isValid && validTill > now && (
          <h3 className="text-secondary/50">
            Gültig bis: {validTill.toLocaleString(DateTime.DATE_SHORT)}
          </h3>
        )}
        {validTill.isValid && validTill <= now && (
          <h3 className="text-secondary/50">Abgelaufen</h3>
        )}
      </div>
      <div className="flex flex-row items-center gap-6">
        <CodeField code={honoredDeal.code || ''} />
        <AldiButton
          variant="ghost"
          endContent={<IconArrowRight />}
          size="lg"
          color="secondary"
          as={Link}
          href={`/profile/orders/${honoredDeal.id}`}
        >
          Details{' '}
        </AldiButton>
      </div>
    </div>
  );
}