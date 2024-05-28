'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AldiButton } from '../nextui/aldi-button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

export default function CardActivation() {
  const router = useRouter();
  // Fake array of deals
  const items = [
    {
      id: 1,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/img_1.png',
      imageAlt: 'cart item',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
      available: true,
    },
  ];
  return (
    <Card className="bg-gray-100">
      <CardHeader className="flex justify-center border-b pb-4 pt-6">
        <h1 className="text-lg text-secondary">Aktiviere deine Deal(s):</h1>
      </CardHeader>
      <CardBody>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 md:flex-row md:px-4"
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              width={85}
              height={85}
            />
            <h1 className="text-lg font-bold text-aldi-blue md:w-[40%] ">
              {item.name}
            </h1>
          </div>
        ))}
      </CardBody>
      <CardFooter className="flex justify-center border-t pb-8 pt-8">
        <AldiButton
          className="w-full md:w-48"
          size="lg"
          variant="solid"
          color="secondary"
          onClick={() => router.push('/redemption/thankyou')}
        >
          Deal aktivieren
        </AldiButton>
      </CardFooter>
    </Card>
  );
}
