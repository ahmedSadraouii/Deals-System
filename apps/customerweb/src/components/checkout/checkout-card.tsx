import React from 'react';
import Image from 'next/image';
import { AldiCard } from '../nextui/aldi-card';
import { CardBody } from '@nextui-org/react';

interface CheckoutCardProps {
  imgUrl: string;
  title: string;
  description: string;
}
export default function CheckoutCard({
  imgUrl,
  title,
  description,
}: CheckoutCardProps) {
  return (
    <AldiCard>
      <CardBody className="flex flex-col items-center gap-4 p-8">
        <Image src={imgUrl} alt="image celebration" width={40} height={50} />
        <h1 className="text-center text-2xl font-bold text-secondary">
          {title}
        </h1>
        <p className="text-center text-secondary opacity-50">{description}</p>
      </CardBody>
    </AldiCard>
  );
}
