import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { IconClock } from '@/components/svg/icon-clock';

interface MegaDealProps {
  availabilityEnd: string;
}

export default function MegaDealCard({ availabilityEnd }: MegaDealProps) {
  return (
    <Card className="w-fit border border-white/10 bg-white/10 backdrop-blur-sm">
      <CardBody className="flex flex-row items-center gap-2">
        <h1 className="whitespace-nowrap font-semibold uppercase text-white sm:text-xl md:text-2xl">
          Dein Mega Deal
        </h1>
        <div className="ms-3 flex items-center space-x-1  rtl:space-x-reverse">
          <div className="flex  items-center rounded border-1 bg-white px-4 py-1 font-normal text-aldi-key">
            <IconClock className="mr-2" />
            <span className="mr-1 hidden md:block">Noch</span> {availabilityEnd}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
