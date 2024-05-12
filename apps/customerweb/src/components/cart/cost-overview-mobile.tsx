import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';

interface CostOverviewProps {
  expired: boolean;
  subtotal: string;
  discount: string;
  total: string;
}
export function CostOverviewMobile({
  expired,
  subtotal,
  discount,
  total,
}: CostOverviewProps) {
  return (
    <Card className="bg-gray-100">
      <CardHeader className="border-b">
        <div>
          <h1 className="text-3xl font-bold leading-10">Übersicht</h1>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
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
