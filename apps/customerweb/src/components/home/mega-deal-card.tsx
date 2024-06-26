import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { IconClock } from '@/components/svg/icon-clock';

export default function MegaDealCard() {
  return (
    <Card className="w-fit border border-white/10 bg-transparent bg-white/10 backdrop-blur-sm">
      <CardBody className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-semibold uppercase text-white">
          Dein Mega Deal
        </h1>
        <div className="ms-3 flex items-center space-x-1  rtl:space-x-reverse">
          <div className="flex  items-center rounded-lg border-1 bg-white px-4 py-2 font-normal text-aldi-key">
            <IconClock className="mr-2" />
            <span className="mr-1 hidden md:block">Noch</span> 13:32:16
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
