import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import type { ContentApi } from 'api-content';
import humanizeDuration from 'humanize-duration';
import { DateTime, Interval } from 'luxon';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { IconClock } from '@/components/svg/icon-clock';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export interface DealsListItemProps {
  deal: UmbracoDeal;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
}

function formatAvailability(availabilityEnd: string): string {
  // parse availabilityEnd as ISO date
  const date = DateTime.fromISO(availabilityEnd);
  const diff = Interval.fromDateTimes(DateTime.now(), date);
  return humanizeDuration(diff.toDuration().valueOf(), {
    largest: 1,
    language: 'de',
  });
}

export async function DealsListItem({ deal, display }: DealsListItemProps) {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  const dealContent = await contentApi.getContentItemById20({
    id: deal.id,
  });
  const fullDeal = dealContent as UmbracoDeal;

  const supplierContent = await contentApi.getContentItemById20({
    id: fullDeal.properties?.supplier!.id!,
  });
  const fullSupplier = supplierContent as UmbracoSupplier;

  const primaryImage = fullDeal.properties?.pictures?.[0]?.url;
  const supplierImage = fullSupplier.properties?.picture?.[0]?.url;

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

  if (display === 'Grid') {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg bg-white">
        <div
          className="h-72 bg-cover bg-center"
          style={{
            backgroundImage: productImageUrl && `url(${productImageUrl})`,
          }}
        />
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-row items-center justify-between">
            <div
              className="h-10 w-48 bg-contain bg-left bg-no-repeat"
              style={{
                backgroundImage: supplierImageUrl && `url(${supplierImageUrl})`,
              }}
            />
            {deal.properties?.availabilityEnd && (
              <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-2 text-primary">
                <IconClock className="text-2xl" />{' '}
                <span>
                  {formatAvailability(deal.properties?.availabilityEnd)}
                </span>
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-secondary">
            {fullDeal.name}
          </div>
          <div className="flex flex-row justify-between">
            <Price
              oldPrice={fullDeal.properties?.regularPrice}
              actualPrice={fullDeal.properties?.price || 9999}
              showDigits={false}
              uvp={false}
              textSize={2}
            />
            <AldiButton variant="ghost" isIconOnly={true}>
              <IconArrowRight className="text-xl text-secondary/10" />
            </AldiButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify({ display, fullDeal }, null, 2)}
      </pre>
    </div>
  );
}
