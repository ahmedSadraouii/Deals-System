import React from 'react';
import Image from 'next/image';
import { CardBody, CardHeader } from '@nextui-org/react';
import MegaDealCard from '@/components/home/mega-deal-card';
import { TrackableCard } from '@/components/home/trackable-card';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { PageViewTracking } from '@/components/tracking-page-view';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { getContentApiClient } from '@/utils/content-api-client';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { formatAvailability } from '@/utils/format-availability';

interface HeroBannerProps {
  deals: Array<UmbracoDeal>;
}

export default async function HeroBanner({ deals }: HeroBannerProps) {
  const contentApi = getContentApiClient();
  const fullDeal = await contentApi.getUmbracoDeal(deals[0].id);
  const pageInfo = {
    pageName: 'aldi-deals-landingpage',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'landingpage',
  };

  if (!fullDeal) {
    return null;
  }

  const fullSupplier = await contentApi.getUmbracoSupplierByDeal(fullDeal);

  if (!fullSupplier) {
    return null;
  }

  const primaryImage =
    fullDeal.properties?.pictures?.[0]?.url &&
    fixUmbracoMediaLink(fullDeal.properties?.pictures?.[0]?.url);

  const supplierImage =
    fullSupplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(fullSupplier.properties?.picture?.[0]?.url);

  const dealLink = fullDeal.route.path.split('/')[3];
  const targetUrl = `/deal/${dealLink || fullDeal.route.path}`;

  return (
    <div className="container mx-auto mt-10 px-4 md:px-0">
      <TrackableCard
        className="relative h-[60vh] rounded-lg lg:aspect-video lg:h-auto lg:rounded-[40px]"
        link={targetUrl}
      >
        {primaryImage && (
          <Image
            src={primaryImage}
            alt=""
            width={1680}
            height={1680}
            className="h-full object-cover object-center"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-black/0 to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full flex-col items-center justify-between xl:mt-64">
          <CardHeader>
            <div className="mb:0 mt-2 flex items-center gap-4 rounded-lg border border-white/10 bg-white/10 p-2 backdrop-blur-sm md:hidden lg:mb-12">
              {supplierImage && (
                <Image
                  src={supplierImage}
                  alt={fullSupplier.name}
                  width={64}
                  height={64}
                />
              )}
              <div>
                <p className="text-white">Partner des Deals:</p>
                <h1 className="text-xl text-white">{fullSupplier.name}</h1>
              </div>
            </div>
          </CardHeader>
          <CardBody className="flex h-full flex-col items-start justify-end gap-6 p-5 md:ml-6 md:mt-0 md:justify-center lg:gap-2">
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
            <div className="flex w-full items-center justify-between">
              <AldiButton
                variant="solid"
                color="primary"
                endContent={<IconArrowRight />}
                size="lg"
                className="h-20 px-8 text-2xl"
              >
                Jetzt Deal sichern
              </AldiButton>
              <div className="hidden items-center gap-4 rounded-[20px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm md:flex">
                <div
                  className={cn(
                    'flex h-20 w-20 items-center justify-center rounded-[20px] bg-neutral-200/10 p-2',
                  )}
                >
                  {supplierImage && (
                    <Image
                      src={supplierImage}
                      alt={fullSupplier.name}
                      width={64}
                      height={64}
                      className="shrink-0 object-contain"
                    />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-base text-white">Partner des Deals:</p>
                  <h1 className="text-2xl text-white">{fullSupplier.name}</h1>
                </div>
              </div>
            </div>
          </CardBody>
        </div>
        <PageViewTracking pageInfo={pageInfo} />
      </TrackableCard>
    </div>
  );
}
