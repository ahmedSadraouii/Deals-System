import { ReservationTime } from './reservation-time';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export function ShoppingCartMobile() {
  // Fake array of items
  const items = [
    {
      id: 1,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/cart-item-img.png',
      imageAlt: 'cart item',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
      available: true,
    },

    {
      id: 2,
      name: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      quantity: 4,
      imageSrc: '/cart-item-img.png',
      imageAlt: 'cart item',
      originalPrice: '1200,00€',
      discountedPrice: '900,00€',
      available: true,
    },
  ];
  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold leading-10 text-aldi-blue">
            Warenkorb
          </h1>
          <p className="text-aldi-blue underline">Bearbeiten</p>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <ReservationTime time="12:59" />
        {items.map((item) => (
          <div
            className="flex items-center justify-between gap-20 border-b px-5 pb-4 
            "
            key={item.id}
          >
            <div
              className={`flex gap-4 ${!item.available ? 'opacity-10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-lg font-bold leading-10 text-aldi-blue">
                      {item.name}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-aldi-blue">
                        Anzahl insgesamt: {item.quantity}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-orange-600">
                        {item.discountedPrice}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
