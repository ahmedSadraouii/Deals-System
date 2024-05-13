import Image from 'next/image';
import { ReservationTime } from './reservation-time';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';

interface CostOverviewProps {
  expired: boolean;
  subtotal: string;
  discount: string;
  total: string;
}
export function ShoppingCart({
  expired,
  subtotal,
  discount,
  total,
}: CostOverviewProps) {
  // Fake array of items
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

    {
      id: 2,
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
    <Card className="bg-gray-100 p-6 ">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold leading-10">Warenkorb</h1>
          <p className="underline">Bearbeiten</p>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <ReservationTime time="12:59" />
        {items.map((item) => (
          <div
            className="items-center justify-between gap-20 border-b pb-4 
            "
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
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-lg font-bold leading-10">
                      {item.name}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Anzahl insgesamt: {item.quantity}</p>
                      <p className="underline">Entfernen</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-orange-600">
                    {item.discountedPrice}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4 border-b pb-6">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              Zwischensumme{' '}
              <span className="text-sm text-gray-500"> inkl. MwSt.</span>
            </p>
            <p className="text-lg">{subtotal}€</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Du sparst</p>
            <p className="text-lg text-orange-600">-{discount}€</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-6">
          <p className="text-xl font-semibold">
            Gesamtpreis{' '}
            <span className="text-sm text-gray-500">inkl. MwSt.</span>
          </p>
          <p className="text-2xl font-bold text-orange-600">{total}€</p>
        </div>
        <div className="flex gap-2">
          <AldiCheckbox />
          <p className="text-sm text-gray-500">
            Ich erkläre mich damit einverstanden, dass meine Bestellung
            rechtsverbindlich ist und dass ich die AGB sowie die
            Datenschutzrichtlinien von ALDI Deals gelesen und akzeptiert habe.
          </p>
        </div>
        <div className="flex gap-2">
          <AldiCheckbox />
          <p className="text-sm text-gray-500">
            Ich erkläre mich damit einverstanden, dass meine Bestellung
            rechtsverbindlich ist und dass ich die AGB sowie die
            Datenschutzrichtlinien von ALDI Deals gelesen und akzeptiert habe.
          </p>
        </div>
        <AldiButton
          className="mb-6"
          size="lg"
          variant="solid"
          href="/"
          isDisabled={expired}
          color="secondary"
        >
          Jetzt kostenpflichtig abschliessen{' '}
        </AldiButton>
      </CardBody>
    </Card>
  );
}
