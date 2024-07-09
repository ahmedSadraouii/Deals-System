'use client';

import React, { useState } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import { Divider, Tooltip } from '@nextui-org/react';
import { AddDealToCart } from '@/app/deal/[path]/add-deal-to-cart';
import { DealPerkCard } from '@/app/deal/[path]/deal-perk-card';
import { DetailPageCarousel } from '@/components/carousel/detail-page-carousel';
import { HeartFavorite } from '@/components/heart-favorite';
import { Price } from '@/components/price';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';
import { IconClock } from '@/components/svg/icon-clock';
import { IconTag } from '@/components/svg/icon-tag';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { formatAvailability } from '@/utils/format-availability';

export interface DealDetailPageProps {
  deal: UmbracoDeal;
  supplier: UmbracoSupplier;
}

export function DealDetailPage({ deal, supplier }: DealDetailPageProps) {
  const productImages =
    deal.properties?.pictures
      ?.filter((picture) => !!picture.url)
      ?.map((picture) =>
        defaultLoader({
          src: `${process.env.CONTENT_API_BASE_URL}${picture.url}`,
          width: 1280,
          config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
        }),
      ) ?? [];

  const supplierImage = supplier.properties?.picture?.[0]?.url;

  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${supplierImage}`,
      width: 256,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div>
      <div className="border-b">
        <div className="container mx-auto flex flex-row items-center space-x-2 p-4 text-secondary">
          <Link href="/" className="text-secondary">
            Start
          </Link>
          <ChevronRightSvg />
          <span className="font-bold">{deal.name}</span>
        </div>
      </div>
      <div className="container mx-auto space-y-10 px-4 py-4 xl:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="col-span-6 flex grow flex-col gap-y-4 lg:gap-y-10 2xl:col-span-7">
            <DetailPageCarousel itemStart={0} itemsPerPage={5}>
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    'cursor-pointer overflow-hidden rounded-lg lg:rounded-[20px]',
                    activeImageIndex === index && 'border-secondary',
                  )}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div className="absolute left-0 right-0 top-0 flex flex-row justify-between p-6">
                    <span className="flex items-center rounded bg-white px-6 py-4 text-xs text-secondary">
                      <IconTag className="mr-2 text-base" />
                      <span className="text-aldi-key">Stark nachgefragt</span>
                    </span>
                    {deal.properties?.availabilityEnd && (
                      <div className="flex items-center space-x-2 rounded-md border border-secondary/10 p-4 text-primary">
                        <IconClock className="text-2xl" />{' '}
                        <span>
                          {formatAvailability(deal.properties?.availabilityEnd)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="aspect-video h-full overflow-hidden rounded-[20px] bg-cover bg-center lg:aspect-auto lg:min-h-[480px]"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </div>
              ))}
            </DetailPageCarousel>
          </div>
          <div className="col-span-6 flex flex-col gap-4 2xl:col-span-5">
            <div className="flex grow flex-col gap-y-6 rounded-[20px] bg-default-100 p-10">
              <div className="flex flex-row items-center justify-between gap-6">
                <h1 className="text-2xl font-bold text-secondary">
                  {deal.name}
                </h1>
                <HeartFavorite dealId={deal.id} />
              </div>
              {deal.properties?.availabilityEnd && (
                <div className="hidden flex-row items-center gap-2 text-secondary/50 lg:flex">
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
              <p className="text-secondary">{deal.properties?.description}</p>
              <Divider />
              <div className="flex grow flex-col justify-end">
            
                {/*<Tooltip content="TODO: Woher wissen wir, ob es ein UVP Preis ist?">
                  <div>
                    <Price
                      oldPrice={deal.properties?.regularPrice}
                      actualPrice={deal.properties?.price || 9999}
                      showDigits={false}
                      uvp={true}
                      textSize={2}
                    />
                  </div>
                </Tooltip>*/}
              </div>
              <div className="flex flex-col gap-2">
                <AddDealToCart
                  dealId={deal.id}
                  maxCustomerQuantity={deal.properties?.maxOrderQuantity || 0}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 rounded-[20px] border border-secondary/10 p-10">
              <Image
                src={supplierImageUrl!}
                alt={supplier.name}
                width={64}
                height={64}
                className="shrink-0 object-contain"
              />
              <div className="flex flex-col">
                <div className="text-sm font-medium text-secondary/50">
                  Partner des Deals:
                </div>
                <div className="text-2xl font-medium text-secondary">
                  {supplier.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-10 2xl:grid-cols-12">
          <div className="col-span-6 flex grow flex-col gap-y-4 lg:gap-y-10 2xl:col-span-8">
            <Divider />
            <div className="flex flex-row flex-wrap gap-4">
              {deal.properties?.greatOffer && (
                <DealPerkCard perk="greatOffer" />
              )}
              {deal.properties?.outdoorActivity && (
                <DealPerkCard perk="outdoorActivity" />
              )}
              {deal.properties?.perfectGift && (
                <DealPerkCard perk="perfectAsGift" />
              )}
              {deal.properties?.forFamily && <DealPerkCard perk="forFamily" />}
              {deal.properties?.ourRecommendation && (
                <DealPerkCard perk="ourRecommendation" />
              )}
            </div>
            <Divider />
            <div className="flex flex-col space-y-6 rounded-lg border border-secondary/10 p-10 lg:rounded-[20px]">
              <h1 className="text-4xl font-bold text-secondary">
                Beschreibung
              </h1>
              <p className="text-secondary">{deal.properties?.description}</p>
              {/*<div className="inline-block">
                <Tooltip content="TODO: Was passiert on-click?">
                  <a
                    href="#"
                    className="inline-flex flex-row items-center space-x-2"
                  >
                    <span className="text-secondary underline underline-offset-2">
                      Mehr anzeigen
                    </span>
                    <ChevronRightSvg />
                  </a>
                </Tooltip>
              </div> */}
            </div>
            {deal.properties?.details && (
              <div className="flex flex-col space-y-6 rounded-lg border border-secondary/10 p-10 lg:rounded-[20px]">
                <h1 className="text-4xl font-bold text-secondary">Details</h1>
                <p className="text-secondary">{deal.properties?.details}</p>
                {/*<div className="inline-block">
                  <Tooltip content="TODO: Was passiert on-click?">
                    <a
                      href="#"
                      className="inline-flex flex-row items-center space-x-2"
                    >
                      <span className="text-secondary underline underline-offset-2">
                        Mehr anzeigen
                      </span>
                      <ChevronRightSvg />
                    </a>
                  </Tooltip>
                </div>*/}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
