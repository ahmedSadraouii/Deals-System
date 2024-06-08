import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import MegaDealCard from '@/components/home/mega-deal-card';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';

interface HeroBannerProps {
  originalPrice: number;
  newPrice: number;
  dealPartner: string;
}

export default function HeroBanner({
  originalPrice,
  newPrice,
  dealPartner,
}: HeroBannerProps) {
  return (
    <Card className="flex h-[70vh] bg-[url('/hero-image.png')] bg-cover bg-center md:h-[80vh]">
      <CardHeader>
        <div className="mt-6 flex items-center gap-4 rounded-lg bg-transparent p-2 backdrop-blur-sm md:hidden">
          <Image src="/img_1.png" alt="partner image" width={65} height={65} />
          <div>
            <p className="text-white">Partner des Deals:</p>
            <h1 className="text-xl text-white">{dealPartner}</h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-5 flex flex-col items-start justify-end gap-6 md:mb-16 md:ml-6">
        <MegaDealCard />
        <h1 className="hidden text-6xl font-semibold uppercase text-white md:block">
          2 Tickets zum Preis <br /> von 1 für Mud Masters{' '}
        </h1>
        <h1 className="text-4xl font-semibold uppercase text-white md:hidden">
          2 Tickets zum <br /> Preis von 1 für <br /> Mud Masters{' '}
        </h1>
        <Price
          oldPrice={originalPrice}
          actualPrice={newPrice}
          showDigits={true}
          uvp={true}
          textSize={3}
        />
        <div className="flex w-full items-center justify-between">
          <AldiButton
            as={Link}
            variant="solid"
            color="primary"
            endContent={<IconArrowRight />}
            href=""
            size="lg"
          >
            Jetzt Deal sichern
          </AldiButton>
          <div className="mr-6 hidden items-center gap-4 bg-transparent p-2 backdrop-blur-sm md:flex">
            <Image
              src="/img_1.png"
              alt="partner image"
              width={65}
              height={65}
            />
            <div>
              <p className="text-white">Partner des Deals:</p>
              <h1 className="text-xl text-white">{dealPartner}</h1>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
