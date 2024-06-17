'use client';

import React, { useMemo } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Link from 'next/link';
import type { DealsListItemProps } from '@/components/deal/deals-list-item';
import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { HeartFavorite } from '@/components/heart-favorite';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { IconClock } from '@/components/svg/icon-clock';
import { IconTag } from '@/components/svg/icon-tag';
import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { formatAvailability } from '@/utils/format-availability';

export type DealsListItemHeroSliderProps = Omit<
  DealsListItemProps,
  'display'
> & {
  supplier: UmbracoSupplier;
};

export function DealsListItemHeroSlider({
  deal,
  supplier,
  className,
  isGuest
}: DealsListItemHeroSliderProps) {
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

  const dealLinkSegment = useMemo(
    () => deal.route.path.split('/')[3],
    [deal.route.path],
  );
  return (
    <>
      <div className="lg:hidden">
        <DealsListItemGrid
          className="bg-default-100"
          deal={deal}
          supplier={supplier}
          ctaType="button"
          isGuest={isGuest}
        />
      </div>
      <div
        className={cn(
          'hidden w-full flex-row gap-10 overflow-hidden rounded-[40px] bg-default-100 p-10 lg:flex xl:aspect-[2/1]',
          className,
        )}
      >
        <div className="relative shrink-0 basis-1/2 overflow-hidden rounded-[20px]">
          <div
            className="aspect-square bg-cover bg-center"
            style={{
              backgroundImage: productImageUrl && `url(${productImageUrl})`,
            }}
          />
          <div className="absolute left-0 right-0 top-0 flex flex-row justify-between p-6">
            <span className="flex items-center rounded bg-gray-100 p-4 text-xs text-aldi-key">
              <IconTag className="mr-2 text-base" />
              <span>Stark nachgefragt</span>
            </span>
            <HeartFavorite dealId={deal.id} />
          </div>
        </div>
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-6">
              <div className="overflow-hidden rounded-[20px] bg-default-200 p-2">
                <div
                  className="h-20 w-20 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      supplierImageUrl && `url(${supplierImageUrl})`,
                  }}
                />
              </div>
              <h1 className="text-4xl font-bold text-secondary">
                {supplier.name}
              </h1>
            </div>
            {deal.properties?.availabilityEnd && (
              <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-2 text-primary">
                <IconClock className="text-2xl" />{' '}
                <span>
                  {formatAvailability(deal.properties?.availabilityEnd)}
                </span>
              </div>
            )}
          </div>
          <div className="mt-10 grow">
            <h1 className="mb-4 text-5xl font-bold text-secondary">
              {deal.name}
            </h1>
            <p className="text-lg text-secondary/50">
              {deal.properties?.description}
            </p>
          </div>
          <div>
            <Price
              oldPrice={deal.properties?.regularPrice}
              actualPrice={deal.properties?.price || 9999}
              showDigits={false}
              uvp={false}
              textSize={3}
            />

            <AldiButton
              as={Link}
              variant="solid"
              color="primary"
              endContent={<IconArrowRight />}
              href={`/deal/${dealLinkSegment || deal.route.path}`}
              size="lg"
            >
              Jetzt Deal sichern
            </AldiButton>
          </div>
        </div>
      </div>
    </>
  );
}
