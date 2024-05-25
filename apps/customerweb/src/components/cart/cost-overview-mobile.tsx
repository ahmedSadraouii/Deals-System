import { useState } from 'react';
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
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);

  const handleCheckbox1Change = () => {
    setIsCheckbox1Checked(!isCheckbox1Checked);
  };

  const handleCheckbox2Change = () => {
    setIsCheckbox2Checked(!isCheckbox2Checked);
  };

  const isButtonDisabled =
    expired || !isCheckbox1Checked || !isCheckbox2Checked;
  return (
    <Card className="bg-gray-100">
      <CardHeader className="border-b">
        <div>
          <h1 className="text-3xl font-bold leading-10 text-aldi-blue">
            Übersicht
          </h1>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 border-b pb-6">
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
        <div className="flex gap-2">
          <AldiCheckbox
            checked={isCheckbox1Checked}
            onChange={handleCheckbox1Change}
          />
          <p className="text-sm text-gray-500">
            Ich erkläre mich damit einverstanden, dass meine Bestellung
            rechtsverbindlich ist und dass ich die AGB sowie die
            Datenschutzrichtlinien von ALDI Deals gelesen und akzeptiert habe.
          </p>
        </div>
        <div className="flex gap-2">
          <AldiCheckbox
            checked={isCheckbox2Checked}
            onChange={handleCheckbox2Change}
          />
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
          form="billing-address-form"
          type="submit"
          isDisabled={isButtonDisabled}
          color="secondary"
        >
          Jetzt kostenpflichtig abschliessen{' '}
        </AldiButton>
      </CardBody>
    </Card>
  );
}
