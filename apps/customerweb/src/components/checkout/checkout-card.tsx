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
    <div>
      <Card className="bg-gray-100">
        <CardBody className="xxl:h-72 flex flex-col items-center justify-center gap-4 p-8 md:h-96 xl:h-full">
          <Image src={imgUrl} alt="image celebration" width={40} height={50} />
          <h1 className="text-center text-2xl font-bold text-secondary">
            {title}
          </h1>
          <p className="text-center text-aldi-blue opacity-50">{description}</p>
        </CardBody>
      </Card>
    </div>
  );
}
