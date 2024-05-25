'use client';

import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';

interface CostOverviewProps {
  expired: boolean;
  subtotal: string;
  discount: string;
  total: string;
}
export function CostOverview({
  expired,
  subtotal,
  discount,
  total,
}: CostOverviewProps) {
  const router = useRouter();
  return (
    <Card className="bg-gray-100 lg:min-w-96">
      <CardHeader className="border-b pb-4">
        <h1 className="pl-5 text-3xl font-bold leading-10 text-aldi-blue">
          kostenübersicht
        </h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 border-b pb-6 pt-6 ">
          <div className="flex items-center justify-between">
            <p className="text-lg text-aldi-blue">
              Zwischensumme{' '}
              <span className="text-sm text-gray-500"> inkl. MwSt.</span>
            </p>
            <p className="text-lg">{subtotal}€</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg text-aldi-blue">Du sparst</p>
            <p className="text-lg text-orange-600">-{discount}€</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b pb-6">
          <p className="text-xl font-semibold text-aldi-blue">
            Gesamtpreis{' '}
            <span className="text-sm text-gray-500">inkl. MwSt.</span>
          </p>
          <p className="text-2xl font-bold text-orange-600">{total}€</p>
        </div>
        <AldiButton
          className="mb-6"
          size="lg"
          variant="solid"
          onClick={() => {
            router.push('/cart/checkout');
          }}
          isDisabled={expired}
          color="secondary"
        >
          Zur Kasse
        </AldiButton>
      </CardBody>
    </Card>
  );
}
