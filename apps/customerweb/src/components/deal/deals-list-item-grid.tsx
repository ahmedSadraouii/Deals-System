'use client';

import type { MouseEvent } from 'react';
import { useCallback, useContext, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import { FavoriteContext } from '@/app/(aldi-deals)/contexts/favorite/favorite-context';
import { DealCountdown } from '@/components/deal-countdown';
import type { DealsListItemProps } from '@/components/deal/deals-list-item';
import { HeartFavorite } from '@/components/heart-favorite';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { IconOnline } from '@/components/svg/icon-nur-online';
import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { trackCTA, trackOfferClick } from '@/utils/tracking';

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
  const ctaText = 'Jetzt Deal sichern';
  const targetUrl = `/deal/${dealLinkSegment || deal.route.path}`;
  const handleCtaClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
    trackOfferClick(deal.name, supplier.name);
  }, [deal.name, supplier.name, targetUrl]);

  const interactionContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOnClick = useCallback(
    (e: MouseEvent) => {
      if (
        interactionContainer.current &&
        interactionContainer.current.contains(e.target as Node)
      ) {
        e.preventDefault();
      } else {
        router.push(targetUrl);
      }
    },
    [router, targetUrl],
  );

  return (
    <a
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-xl hover:shadow-black/5',
        className,
      )}
      onClick={handleOnClick}
      href={targetUrl}
    >
      <div className="relative">
        {primaryImage && (
          <Image
            className="h-[280px] object-cover object-center transition-opacity group-hover:opacity-80"
            src={primaryImage}
            alt="Deal Image"
            width={768}
            height={768}
          />
        )}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-6">
          <span className="flex items-center rounded-lg bg-neutral-100 px-4 py-3 font-light text-black">
            <IconOnline className="mr-2 text-base" />
            <span className="text-aldi-key">Nur Online</span>
          </span>
          <div ref={interactionContainer}>
            {favoriteContext.favsEnabled && <HeartFavorite dealId={deal.id} />}
          </div>
        </div>
      </div>

      <div className="flex grow flex-col gap-6 p-6">
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
          {(deal.properties?.availabilityEnd && (
            <DealCountdown availableTill={deal.properties?.availabilityEnd} />
          )) || (
            <DealCountdown
              availableTill={DateTime.now().plus({ minutes: 12 }).toISO()}
            />
          )}
        </div>
        <div className="flex h-14 grow items-center text-2xl font-bold text-secondary">
          <span>{deal.name}</span>
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
              variant="ghost"
              isIconOnly={true}
              onClick={handleCtaClick}
            >
              <IconArrowRight className="text-xl text-secondary/10" />
            </AldiButton>
          )}
        </div>
        {ctaType === 'button' && (
          <AldiButton
            variant="solid"
            color="secondary"
            fullWidth={true}
            endContent={<IconArrowRight className="text-xl text-white" />}
            onClick={handleCtaClick}
          >
            Jetzt deal sichern
          </AldiButton>
        )}
      </div>
    </a>
  );
}
