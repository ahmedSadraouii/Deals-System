import React from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import type { UmbracoDeal, UmbracoSupplier } from '../umbraco-types';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import MegaDealCard from '@/components/home/mega-deal-card';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

interface HeroBannerProps {
  deals: Array<UmbracoDeal>;
}

export default async function HeroBanner({ deals }: HeroBannerProps) {
  const contentApi = getContentApiClient();

  const dealContent = await contentApi.getContentItemById20({
    id: deals[0].id,
  });
  const fullDeal = dealContent as UmbracoDeal;

  if (!verifyDealIsCorrect(fullDeal)) {
    console.log('Deal is incorrect', fullDeal);
    return null;
  }

  const supplierContent = await contentApi.getContentItemById20({
    id: fullDeal.properties?.supplier!.id!,
  });

  const fullSupplier = supplierContent as UmbracoSupplier;

  if (!verifySupplierIsCorrect(fullSupplier)) {
    console.log('Supplier is incorrect', fullSupplier);
    return null;
  }
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

  const dealLink = fullDeal.route.path.split('/')[3];
  const cardStyle = {
    backgroundImage: `url(${productImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <Card
      className="container mx-auto h-[80vh] rounded-[40px] md:h-[60vh]"
      style={cardStyle}
    >
      <CardHeader>
        <div className="mt-6 flex items-center gap-4 rounded-lg bg-transparent p-2 backdrop-blur-sm md:hidden">
          <Image src="/img_1.png" alt="partner image" width={65} height={65} />
          <div>
            <p className="text-white">Partner des Deals:</p>
            <h1 className="text-xl text-white">{fullSupplier.name}</h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-5 flex flex-col items-start justify-end gap-6 md:mb-16 md:ml-6">
        <MegaDealCard />
        <h1 className="hidden text-6xl font-semibold uppercase text-white md:block">
          {fullDeal.name}
        </h1>
        <h1 className="text-4xl font-semibold uppercase text-white md:hidden">
          {fullDeal.name}
        </h1>
        <div className="hidden md:block">
          <Price
            oldPrice={fullDeal.properties?.regularPrice}
            actualPrice={fullDeal.properties?.price || 0}
            showDigits={true}
            uvp={true}
            badge={3}
            textSize={3}
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
          <div className="hidden items-center gap-4 bg-transparent p-2 backdrop-blur-sm md:flex">
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
        </div>
      </CardBody>
    </Card>
  );
}
