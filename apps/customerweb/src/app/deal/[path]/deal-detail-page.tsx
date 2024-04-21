import React, { useMemo } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';
import { HeartSvg } from '@/components/svg/heart-svg';
import { IconCart } from '@/components/svg/icon-cart';
import { IconClock } from '@/components/svg/icon-clock';
import { IconShare } from '@/components/svg/icon-share';
import { IconTag } from '@/components/svg/icon-tag';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { formatAvailability } from '@/utils/format-availability';

export interface DealDetailPageProps {
  deal: UmbracoDeal;
  supplier: UmbracoSupplier;
}
export function DealDetailPage({ deal, supplier }: DealDetailPageProps) {
  const primaryImage = deal.properties?.pictures?.[0]?.url;
  const supplierImage = supplier.properties?.picture?.[0]?.url;

  const productImageUrl =
    primaryImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${primaryImage}`,
      width: 1280,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${supplierImage}`,
      width: 512,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const dealLinkSegment = useMemo(
    () => deal.route.path.split('/')[3],
    [deal.route.path],
  );

  return (
    <div>
      <div className="border-b">
        <div className="text-csecondary container mx-auto flex flex-row items-center space-x-2 p-4">
          <Link href="/">Start</Link>
          <ChevronRightSvg />
          <span className="font-bold">{deal.name}</span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 xl:py-20">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row">
          <div className="flex grow flex-col gap-y-4 lg:gap-y-10">
            <div className="relative shrink-0 grow overflow-hidden rounded-[20px]">
              <div
                className="aspect-video bg-cover bg-center"
                style={{
                  backgroundImage: productImageUrl && `url(${productImageUrl})`,
                }}
              />
              <div className="absolute left-0 right-0 top-0 flex flex-row justify-between p-6">
                <span className="flex items-center rounded bg-gray-100 p-4 text-xs text-secondary">
                  <IconTag className="mr-2 text-base" />
                  <span>Stark nachgefragt</span>
                </span>

                <span className="flex items-center rounded bg-gray-100 p-4 text-xs text-secondary">
                  <IconShare className="mr-2 text-base" />
                  <span>Teilen</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex basis-1/3 flex-col gap-y-6 rounded-[20px] bg-default-100 p-10">
            <div className="flex flex-row items-center justify-between gap-6">
              <h1 className="text-2xl font-bold text-secondary">{deal.name}</h1>
              <div className="h-16 w-16 rounded-full border border-[#F05321]/10 bg-[#F05321]/10 p-6">
                <HeartSvg className="text-[#F05321]" />
              </div>
            </div>
            {deal.properties?.availabilityEnd && (
              <div className="flex flex-row items-center gap-2 text-secondary/50">
                <span>Deal läuft ab in</span>
                <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-2 text-primary">
                  <IconClock className="text-2xl" />{' '}
                  <span>
                    {formatAvailability(deal.properties?.availabilityEnd)}
                  </span>
                </div>
                <span>oder bis ausverkauft</span>
              </div>
            )}
            <Divider />
            <p className="text-secondary/50">{deal.properties?.description}</p>
            <Divider />
            <div className="flex grow flex-col justify-center">
              <Price
                oldPrice={deal.properties?.regularPrice}
                actualPrice={deal.properties?.price || 9999}
                showDigits={false}
                uvp={true}
                textSize={2}
              />
            </div>
            <div className="flex flex-row items-center gap-6">
              <AldiButton variant="ghost" isIconOnly={true}>
                -
              </AldiButton>
              <div className="text-3xl font-bold text-secondary">1</div>
              <AldiButton variant="ghost" isIconOnly={true}>
                +
              </AldiButton>
              <AldiButton
                className="grow"
                variant="solid"
                color="secondary"
                endContent={<IconCart className="text-2xl" />}
              >
                In den Warenkorb
              </AldiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
