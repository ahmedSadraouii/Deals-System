import React from 'react';
import Image from 'next/image';
import { Button, Input } from '@nextui-org/react';
import { BasketProductItem } from '@/components/basket/basket-product-item';
import { Price } from '@/components/price';

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h1 className="mb-3 text-2xl font-bold">Rechnungsadresse</h1>
          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
            <div className="mb-4 flex">
              <Input
                type="text"
                label="Vorname"
                className="rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
              <Input
                type="text"
                label="Nachname"
                className="ml-4 rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
            </div>
            <div className="mb-4 flex">
              <Input
                type="text"
                label="Geschlecht"
                className="rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
              <Input
                type="text"
                label="Geburtstag"
                className="ml-4 rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
            </div>

            <div className="mb-4 flex">
              <Input
                type="text"
                label="Straße"
                className="rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
              <Input
                type="text"
                label="Hausnummer"
                className="ml-4 rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
            </div>
            <div className="flex">
              <Input
                type="text"
                label="Stadt"
                className="rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
              <Input
                type="text"
                label="PLZ"
                className="ml-4 rounded-full border-1 border-black !bg-transparent hover:!bg-transparent"
              />
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-bold">Zahlungsmethode</h1>
          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="mr-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-center text-sm">
                  <label
                    htmlFor="inline-radio"
                    className="mb-4 text-sm font-medium text-gray-900"
                  >
                    Mastercard
                  </label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    value=""
                    name="pay"
                    className="pay-radio"
                  />
                </div>
              </div>

              <div className="mr-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-center text-sm">
                  <label
                    htmlFor="inline-radio"
                    className="mb-4 text-sm font-medium text-gray-900"
                  >
                    Mastercard
                  </label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    value=""
                    name="pay"
                    className="pay-radio"
                  />
                </div>
              </div>

              <div className="mr-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-center text-sm">
                  <label
                    htmlFor="inline-radio"
                    className="mb-4 text-sm font-medium text-gray-900"
                  >
                    Mastercard
                  </label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    value=""
                    name="pay"
                    className="pay-radio"
                  />
                </div>
              </div>

              <div className="mr-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-center text-sm">
                  <label
                    htmlFor="inline-radio"
                    className="mb-4 text-sm font-medium text-gray-900"
                  >
                    Mastercard
                  </label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    value=""
                    name="pay"
                    className="pay-radio"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="h-28 w-14 rounded border-gray-300 bg-gray-100 text-blue-600"
            />
            <div className="ms-2 text-sm font-medium text-gray-900">
              Ich erkläre mich damit einverstanden, dass meine Bestellung
              rechtsverbindlich ist und dass ich die AGB sowie die
              Datenschutzrichtlinien von ALDI Deals gelesen und akzeptiert habe.
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="h-10 w-10 rounded border-gray-300 bg-gray-100 text-blue-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Ja, ich möchte den Newsletter erhalten und akzeptiere die
              Datenschutzrichtlinie sowie die Nutzungsbedingungen.
            </label>
          </div>
        </div>
        <div>
          <h1 className="mb-3 text-2xl font-bold">Warenkorb Übersicht</h1>
          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
            <BasketProductItem
              name="Mud Masters Tickets"
              description="2 Tickets zum Preis von 1"
              price={45}
              count={2}
              image="/img_1.png"
            />
            <BasketProductItem
              name="Mud Masters Tickets"
              description="2 Tickets zum Preis von 1"
              price={45}
              count={2}
              image="/img_1.png"
            />
          </div>

          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
            <h1 className="mb-3 text-xl font-bold">Rabattcode eingeben</h1>

            <div className="flex items-center justify-between">
              <Input
                type="text"
                className="rounded-full border-1 border-gray-300 !bg-transparent hover:!bg-transparent"
              />
              <Button className="ml-4 rounded-full bg-slate-900 px-10 text-white">
                Anwenden
              </Button>
            </div>
          </div>

          <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="mb-3 text-xl font-bold">
                Gesamtpreis inkl. MwSt.
              </h1>
              <Price
                price={45}
                discountedPrice={0}
                uvp={false}
                textSize={1}
              />
            </div>
            <hr />
            <div className="mt-5 flex">
              <Button className="w-full rounded-full bg-slate-900 px-10 text-white">
                Jetzt kostenpflichtig abschliessen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
