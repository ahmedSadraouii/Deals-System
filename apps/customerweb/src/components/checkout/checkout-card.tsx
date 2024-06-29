import React from 'react';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

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
    <Card className="bg-neutral-100 shadow-none lg:h-full">
      <CardBody className="flex flex-col items-center gap-4 p-8">
        <Image src={imgUrl} alt="image celebration" width={40} height={50} />
        <h1 className="text-center text-2xl font-bold text-secondary">
          {title}
        </h1>
        <p className="text-center text-aldi-blue opacity-50">{description}</p>
      </CardBody>
    </Card>
  );
}
