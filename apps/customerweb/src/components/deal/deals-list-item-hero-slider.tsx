'use client';

import React, { useCallback, useContext, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteContext } from '@/app/(aldi-deals)/contexts/favorite/favorite-context';
import type { DealsListItemProps } from '@/components/deal/deals-list-item';
import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { HeartFavorite } from '@/components/heart-favorite';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconClock } from '@/components/svg/icon-clock';
import { IconTag } from '@/components/svg/icon-tag';
import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { formatAvailability } from '@/utils/format-availability';
import { trackCTA, trackOfferClick } from '@/utils/tracking';

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
}: DealsListItemHeroSliderProps) {
  const primaryImage =
    deal.properties?.pictures?.[0]?.url &&
    fixUmbracoMediaLink(deal.properties?.pictures?.[0]?.url);
  const supplierImage =
    supplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(supplier.properties?.picture?.[0]?.url);
  const favoriteContext = useContext(FavoriteContext);

  const dealLinkSegment = useMemo(
    () => deal.route.path.split('/')[3],
    [deal.route.path],
  );
  const ctaText = 'Jetzt Deal sichern';
  const targetUrl = `/deal/${dealLinkSegment || deal.route.path}`;
  const handleCtaClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
    trackOfferClick(deal.name, supplier.name);
  }, [ctaText, targetUrl]);

  return (
    <>
      <div className="lg:hidden">
        <DealsListItemGrid
          className="bg-default-100"
          deal={deal}
          supplier={supplier}
          ctaType="button"
        />
      </div>
      <div
        className={cn(
          'relative hidden w-full flex-row gap-10 overflow-hidden rounded-[40px] bg-default-100 p-10 lg:flex xl:aspect-[2/1]',
          className,
        )}
      >
        {primaryImage && (
          <Image
            className="shrink-0 basis-1/2 overflow-hidden rounded-[20px] bg-cover bg-center object-cover"
            src={primaryImage}
            alt="Deal Image"
            width={768}
            height={768}
          />
        )}
        <div className="absolute left-0 right-0 top-0 flex flex-row items-center justify-between p-6">
          <span className="m-8 flex items-center rounded bg-neutral-100 px-6 py-4 text-xs text-aldi-key">
            <IconTag className="mr-2 text-base" />
            <span>Stark nachgefragt</span>
          </span>
          {favoriteContext.favsEnabled && <HeartFavorite dealId={deal.id} />}
        </div>

        <div className="flex grow flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[20px] bg-white">
                {supplierImage && (
                  <Image
                    className="h-20 w-20 object-contain object-center"
                    src={supplierImage}
                    alt={supplier.name}
                    width={80}
                    height={80}
                  />
                )}
              </div>
              <h1 className="text-4xl font-bold text-secondary">
                {supplier.name}
              </h1>
            </div>
            {deal.properties?.availabilityEnd && (
              <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-4 text-primary">
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
            <p className="text-lg font-[420] text-secondary">
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
              badge={2}
            />

            <AldiButton
              as={Link}
              className="px-6"
              variant="solid"
              color="primary"
              href={targetUrl}
              size="lg"
              onClick={handleCtaClick}
            >
              Jetzt Deal sichern
            </AldiButton>
          </div>
        </div>
      </div>
    </>
  );
}
