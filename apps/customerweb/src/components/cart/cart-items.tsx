import Image from 'next/image';
import { CartCounter } from './cart-counter';
import { NotAvailableCartItem } from './not-available-deal';
import { Card, CardHeader, CardBody } from '@nextui-org/react';

interface CartItemsProps {
  expired: boolean;
}
export function CartItems({ expired }: CartItemsProps) {
  // Fake array of items
  const items = [
    {
      id: 1,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/cart-item-img.png',
      imageAlt: 'Description of your image',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
      available: true,
    },
    {
      id: 2,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/cart-item-img.png',
      imageAlt: 'Description of your image',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
      available: true,
    },
  ];
  return (
    <Card className=" bg-gray-100 ">
      <CardHeader className="border-b pb-4">
        <h1 className="pl-5 text-2xl font-bold leading-10 ">Dein Warenkorb</h1>
      </CardHeader>
      <CardBody className={`${expired ? 'opacity-10' : ''}`}>
        {items.map((item, index) => (
          <div
            className={`jus mb-10 flex items-center justify-between gap-20 px-5 ${
              index !== items.length - 1 ? 'border-b pb-4' : ''
            } `}
            key={item.id}
          >
            <div
              className={`flex gap-4 ${!item.available ? 'opacity-10' : ''}`}
            >
              <div className="hidden md:block">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={85}
                  height={85}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="text-lg font-bold leading-10">{item.name}</h1>
                  <div className="md:hidden">
                    <CartCounter />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Anzahl insgesamt: {item.quantity}</p>
                    <p className="underline">Entfernen</p>
                  </div>
                  <div className="md:hidden">
                    <p className="flex justify-end line-through">
                      {item.originalPrice}
                    </p>
                    <h1 className="text-2xl font-bold text-orange-600">
                      {item.discountedPrice}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {item.available ? (
              <div className="hidden flex-col items-center gap-10 md:flex md:flex-row">
                <div>
                  <p className="flex justify-end line-through">
                    {item.originalPrice}
                  </p>
                  <h1 className="text-2xl font-bold text-orange-600">
                    {item.discountedPrice}
                  </h1>
                </div>
                <div>
                  <CartCounter />
                </div>
              </div>
            ) : (
              <div className="max-w-full lg:max-w-[30%]">
                <NotAvailableCartItem />
              </div>
            )}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
