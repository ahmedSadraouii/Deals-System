import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function DiscoverCard() {
  return (
    <div>
      <Card className="bg-[url('/discover-img.png')] bg-cover bg-right	">
        <CardBody className="flex h-96 flex-col justify-center gap-4 xl:ml-32 ">
          <h1 className="text-4xl font-bold text-white">
            Jetzt registrieren und <br></br> exklusive Vorteile sichern!
          </h1>
          <p className="text-white opacity-50">
            Und sichere dir unglaublich gute Angebot und Deals.
          </p>
          <AldiButton
            className="w-48 bg-white"
            size="lg"
            variant="ghost"
            href="/auth"
            color="secondary"
          >
            Jetzt registrieren
          </AldiButton>
        </CardBody>
      </Card>
    </div>
  );
}
