import Image from 'next/image';
import Counter from './cart-counter';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';

export default function CartItems() {
  // Fake array of items
  const items = [
    {
      id: 1,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/img_1.png',
      imageAlt: 'Description of your image',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
    },

    {
      id: 2,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/img_1.png',
      imageAlt: 'Description of your image',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
    },
  ];

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <h1 className="pl-5 text-2xl font-bold leading-10">Dein Warenkorb</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        {items.map((item, index) => (
          <div
            className={`jus mb-10 flex items-center justify-between gap-20 px-5 ${
              index !== items.length - 1 ? 'border-b pb-4' : ''
            }`}
            key={item.id}
          >
            <div className="flex gap-4">
              <div className="hidden md:block">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={85}
                  height={85}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-10">{item.name}</h1>
                <p>Anzahl insgesamt: {item.quantity}</p>
                <p className="underline">Entfernen</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-10 md:flex-row">
              <div>
                <p className="flex justify-end line-through">
                  {item.originalPrice}
                </p>
                <h1 className="text-2xl font-bold text-orange-600">
                  {item.discountedPrice}
                </h1>
              </div>
              <div>
                <Counter />
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
