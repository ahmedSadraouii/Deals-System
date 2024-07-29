'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { HonoredDealModel } from 'api-deals';
import { DateTime } from 'luxon';
import { CodeField } from '@/app/(aldi-deals)/profile/deals/code-field';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';

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
  const supplierImage =
    supplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(supplier.properties?.picture?.[0]?.url);

  const validTill = DateTime.fromISO(deal.properties?.promotionEnd!);
  const now = DateTime.now();
  const pathname = usePathname();
  const isProfile = pathname === '/profile';

  return (
    <div
      className={`flex h-full flex-col items-center gap-2 border-b border-neutral-200 ${isProfile ? 'rounded-lg bg-neutral-100 ' : ''} p-4 py-6 md:h-32 md:flex-row md:gap-6`}
      key={honoredDeal.honoredDealId}
    >
      <div>
        <div className="flex h-24 w-24 items-center justify-center rounded-[20px] bg-neutral-200">
          {supplierImage && (
            <Image
              src={supplierImage}
              alt={supplier.name}
              width={88}
              height={88}
              className="shrink-0 object-contain"
            />
          )}
        </div>
        <h2 className="text-center text-lg font-medium text-secondary md:hidden ">
          {supplier.name}
        </h2>
      </div>

      <div className="flex grow flex-col gap-2">
        <h2 className="text-center text-lg font-medium text-secondary md:text-start">
          {deal.name}
        </h2>
        {validTill.isValid && validTill > now && !isProfile && (
          <h3 className="text-center text-secondary/50 md:text-start">
            Gültig bis: {validTill.toLocaleString(DateTime.DATE_SHORT)}
          </h3>
        )}
        {validTill.isValid && validTill <= now && !isProfile && (
          <h3 className="text-secondary/50">Abgelaufen</h3>
        )}
      </div>
      <div className="flex w-full flex-col gap-6 md:w-auto md:flex-row md:items-center">
        {!isProfile && <CodeField code={honoredDeal.code || ''} />}
        <AldiButton
          variant="ghost"
          endContent={<IconArrowRight />}
          size="lg"
          color="secondary"
          as={Link}
          href={`/profile/deals/${honoredDeal.honoredDealId}`}
        >
          Details{' '}
        </AldiButton>
      </div>
    </div>
  );
}
