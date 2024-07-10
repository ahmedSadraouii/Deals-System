'use client';

import { useContext, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteContext } from '@/app/contexts/favorite/favorite-context';
import type { DealsListItemProps } from '@/components/deal/deals-list-item';
import { HeartFavorite } from '@/components/heart-favorite';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { IconClock } from '@/components/svg/icon-clock';
import { IconOnline } from '@/components/svg/icon-nur-online';
import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { formatAvailability } from '@/utils/format-availability';

export type DealsListItemGridProps = Omit<DealsListItemProps, 'display'> & {
  supplier: UmbracoSupplier;
  ctaType?: 'inline' | 'button';
};

export function DealsListItemGrid({
  deal,
  supplier,
  className,
  ctaType = 'inline',
}: DealsListItemGridProps) {
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

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg bg-white',
        className,
      )}
    >
      {primaryImage && (
        <Image
          className="h-72 object-cover object-center"
          src={primaryImage}
          alt="Deal Image"
          width={768}
          height={768}
        />
      )}
      <div className="flex items-center justify-between p-4">
        <span className="flex items-center rounded bg-neutral-100 px-4 py-2 text-xs font-light text-black">
          <IconOnline className="mr-2 text-base" />
          <span className="text-aldi-key">Nur Online</span>
        </span>
        {favoriteContext.favsEnabled && <HeartFavorite dealId={deal.id} />}
      </div>

      <div className="flex grow flex-col gap-4 p-6">
        <div className="flex flex-row items-center justify-between">
          {supplierImage && (
            <Image
              className="h-10 w-48 object-contain object-left"
              src={supplierImage}
              alt="Supplier Image"
              width={192}
              height={40}
            />
          )}
          {deal.properties?.availabilityEnd && (
            <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-2 text-primary">
              <IconClock className="text-2xl" />{' '}
              <span>
                {formatAvailability(deal.properties?.availabilityEnd)}
              </span>
            </div>
          )}
        </div>
        <div className="grow text-2xl font-bold text-secondary">
          {deal.name}
        </div>
        <div className="flex flex-row justify-between">
          <Price
            oldPrice={deal.properties?.regularPrice}
            actualPrice={deal.properties?.price || 9999}
            showDigits={false}
            uvp={false}
            textSize={2}
          />
          {ctaType === 'inline' && (
            <AldiButton
              as={Link}
              variant="ghost"
              isIconOnly={true}
              href={`/deal/${dealLinkSegment || deal.route.path}`}
            >
              <IconArrowRight className="text-xl text-secondary/10" />
            </AldiButton>
          )}
        </div>
        {ctaType === 'button' && (
          <AldiButton
            as={Link}
            variant="solid"
            color="secondary"
            href={`/deal/${dealLinkSegment || deal.route.path}`}
            fullWidth={true}
            endContent={<IconArrowRight className="text-xl text-white" />}
          >
            Jetzt deal sichern
          </AldiButton>
        )}
      </div>
    </div>
  );
}
