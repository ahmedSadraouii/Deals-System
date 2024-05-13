import React from 'react';
import Image from 'next/image';
import MenuBar from '@/components/account/menu-bar';

export default function Page() {
  return (
    <div className="container mx-auto py-14">
      <MenuBar />

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="rounded-xl bg-gray-100">
          <div className="flex items-center justify-between p-7">
            <h1 className="text-md flex items-center font-extralight">
              <Image
                src="/icons/order-detail-left-icon.svg"
                alt="ALDI Sport Logo"
                width={35}
                height={35}
                className="mr-4"
              />
              Zurück zu Meine Deals
            </h1>
            <h1 className="text-md flex items-center font-extralight">
              Nächster Deal
              <Image
                src="/icons/order-detail-right-icon.svg"
                alt="ALDI Sport Logo"
                width={35}
                height={35}
                className="ml-4"
              />
            </h1>
          </div>
          <hr className="border-b-2" />
          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 p-7">
            <h1 className="mb-2 text-2xl font-extrabold">Beschreibung</h1>
            <p className="text-gray-500">
              Willkommen zu einem unvergleichlichen Abenteuer voller
              Nervenkitzel, Ausdauer und Gemeinschaftssinn – willkommen bei Mud
              Masters! Mit deinem Ticket erwartet dich nicht nur ein
              Hindernisrennen, sondern ein Erlebnis, das deine Sinne schärfen
              und deine Grenzen herausfordern wird.
            </p>
            <h1 className="mb-2 mt-5 text-2xl font-extrabold">Rechtliches</h1>
            <p className="text-gray-500">
              Jeder einzelne Gutschein kann gegen ein Mud Master Ticket
              umgetauscht werden. Der Gutscheinwert von 90 € bezieht sich je
              nach Ort und Datum auf den maximal mit diesem Gutschein
              abgedeckten Gegenwert. Restbeträge bei Veranstaltungstagen, die
              den maximalen Gutscheinwert nicht erreichen, sind nicht
              auszahlbar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
