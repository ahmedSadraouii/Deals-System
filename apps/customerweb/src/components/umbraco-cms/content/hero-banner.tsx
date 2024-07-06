import React from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import MegaDealCard from '@/components/home/mega-deal-card';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { getContentApiClient } from '@/utils/content-api-client';
import { formatAvailability } from '@/utils/format-availability';

interface HeroBannerProps {
  deals: Array<UmbracoDeal>;
}

export default async function HeroBanner({ deals }: HeroBannerProps) {
  const contentApi = getContentApiClient();
  const fullDeal = await contentApi.getUmbracoDeal(deals[0].id);

  if (!fullDeal) {
    return null;
  }

  const fullSupplier = await contentApi.getUmbracoSupplierByDeal(fullDeal);

  if (!fullSupplier) {
    return null;
  }

  const primaryImage = fullDeal.properties?.pictures?.[0]?.url;
  const supplierImage = fullSupplier.properties?.picture?.[0]?.url;

  const productImageUrl =
    primaryImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${primaryImage}`,
      width: 1280,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${supplierImage}`,
      width: 96,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const dealLink = fullDeal.route.path.split('/')[3];
  const cardStyle = {
    backgroundImage: `url(${productImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <div className="container mx-auto mt-10 px-4">
      <Card
        className="relative rounded-lg lg:aspect-video lg:rounded-[40px]"
        style={cardStyle}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-black/0 to-black/80" />
        <CardHeader>
          <div className="mb-12 mt-2 flex items-center gap-4 rounded-lg border border-white/10 bg-white/10 p-2 backdrop-blur-sm md:hidden">
            <Image
              src={supplierImageUrl!}
              alt="partner image"
              width={65}
              height={65}
            />
            <div>
              <p className="text-white">Partner des Deals:</p>
              <h1 className="text-xl text-white">{fullSupplier.name}</h1>
            </div>
          </div>
        </CardHeader>
        <CardBody className="mb-5 flex flex-col items-start justify-end gap-6 md:mb-16 md:ml-6">
          {fullDeal.properties?.availabilityEnd && (
            <MegaDealCard
              availabilityEnd={formatAvailability(
                fullDeal.properties?.availabilityEnd,
              )}
            />
          )}
          <h1 className="hidden text-6xl font-semibold uppercase text-white md:block">
            {fullDeal.name}
          </h1>
          <h1 className="text-4xl font-semibold uppercase text-white md:hidden">
            {fullDeal.name}
          </h1>
          <div className="hidden md:block xl:hidden">
            <Price
              oldPrice={fullDeal.properties?.regularPrice}
              actualPrice={fullDeal.properties?.price || 0}
              showDigits={true}
              uvp={true}
              badge={3}
              textSize={3}
              variant="light"
            />
          </div>
          <div className="hidden xl:block">
            <Price
              oldPrice={fullDeal.properties?.regularPrice}
              actualPrice={fullDeal.properties?.price || 0}
              showDigits={true}
              uvp={true}
              badge={3}
              textSize={4}
              variant="light"
            />
          </div>
          <div className="block md:hidden">
            <Price
              oldPrice={fullDeal.properties?.regularPrice}
              actualPrice={fullDeal.properties?.price || 0}
              showDigits={true}
              uvp={true}
              badge={3}
              textSize={1}
              variant="light"
            />
          </div>
          <div className="flex w-[96%] items-center justify-between">
            <AldiButton
              as={Link}
              variant="solid"
              color="primary"
              endContent={<IconArrowRight />}
              href={`/deal/${dealLink || fullDeal.route.path}`}
              size="lg"
            >
              Jetzt Deal sichern
            </AldiButton>
            <div className="hidden items-center gap-4 rounded-[20px] border border-white/10 bg-white/10 p-2 backdrop-blur-sm md:flex">
              <div
                className={cn(
                  'flex h-20 w-20 items-center justify-center rounded-[20px] bg-neutral-200/10 p-2',
                )}
              >
                <Image
                  src={supplierImageUrl!}
                  alt={fullSupplier.name}
                  width={64}
                  height={64}
                  className="shrink-0 object-contain"
                />
              </div>
              <div className="p-2">
                <p className="text-base text-white">Partner des Deals:</p>
                <h1 className="text-2xl text-white">{fullSupplier.name}</h1>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
