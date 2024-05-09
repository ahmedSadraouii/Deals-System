import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';

interface CostOverviewProps {
  expired: boolean;
}
export function CostOverview({ expired }: CostOverviewProps) {
  const subtotal = '225,00';
  const discount = '45,00';
  const total = '180,00';
  return (
    <Card className="min-w-96 bg-gray-100 ">
      <CardHeader className="border-b pb-4">
        <h1 className="pl-5 text-3xl font-bold leading-10">kostenübersicht</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 border-b pb-6 pt-6 ">
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
        <AldiButton
          className="mb-6"
          size="lg"
          variant="solid"
          href="/"
          color="secondary"
        >
          Zur Kasse
        </AldiButton>
      </CardBody>
    </Card>
  );
}