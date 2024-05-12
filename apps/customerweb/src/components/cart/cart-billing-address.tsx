import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AldiInput } from '@/components/nextui/aldi-input';

export function BillingAddress() {
  return (
    <Card className=" bg-gray-100 ">
      <CardHeader>
        <h1 className="pl-5 text-2xl font-bold leading-10 ">
          Rechnungsadresse
        </h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <AldiInput label="Vorname*" />
          <AldiInput label="Nachname*" />
        </div>
        <div>
          <AldiInput type="date" label="Geburtsdatum*" />
        </div>
        <div className="jusify-center flex items-center gap-4 md:hidden">
          <AldiInput label="PLZ*" type="number" />
          <AldiInput label="Hausnr.*" type="number" />
        </div>
        <div className="flex gap-4">
          <AldiInput className="w-full md:w-[80%]" label="Stadt*" />
          <AldiInput className="hidden md:block md:w-[20%]" label="PLZ*" />
        </div>
        <div className="flex gap-4">
          <AldiInput className="w-full md:w-[80%]" label="Straße*" />
          <AldiInput className="hidden md:block md:w-[20%]" label="Hausnr.*" />
        </div>
        <p>*Pflichtfeld</p>
      </CardBody>
    </Card>
  );
}
