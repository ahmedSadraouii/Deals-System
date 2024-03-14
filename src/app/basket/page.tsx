"use client";
import React from 'react';
import Image from 'next/image'
import ProductItem from "@/components/basket/product-item";
import {Button, Input} from "@nextui-org/react";
import Price from "@/components/price";

const Page = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-3">Rechnungsadresse</h1>
          <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">
            <div className="flex mb-4">
              <Input type="text" label="Vorname"
                     className="border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
              <Input type="text" label="Nachname"
                     className="ml-4 border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
            </div>
            <div className="flex mb-4">
              <Input type="text" label="Geschlecht"
                     className="border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
              <Input type="text" label="Geburtstag"
                     className="ml-4 border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
            </div>

            <div className="flex mb-4">
              <Input type="text" label="Straße"
                     className="border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
              <Input type="text" label="Hausnummer"
                     className="ml-4 border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
            </div>
            <div className="flex">
              <Input type="text" label="Stadt"
                     className="border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
              <Input type="text" label="PLZ"
                     className="ml-4 border-1 border-black rounded-full !bg-transparent hover:!bg-transparent"/>
            </div>
          </div>

          <h1 className="font-bold text-2xl mb-3">Zahlungsmethode</h1>
          <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">


              <div className="flex flex-col items-center justify-center mr-4">
                <div className="mb-2 text-sm text-center">
                  <label htmlFor="inline-radio" className="mb-4 text-sm font-medium text-gray-900">Mastercard</label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex items-center h-5">
                  <input type="radio" value="" name="pay" className="pay-radio"/>
                </div>
              </div>


              <div className="flex flex-col items-center justify-center mr-4">
                <div className="mb-2 text-sm text-center">
                  <label htmlFor="inline-radio" className="mb-4 text-sm font-medium text-gray-900">Mastercard</label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex items-center h-5">
                  <input type="radio" value="" name="pay" className="pay-radio"/>
                </div>
              </div>


              <div className="flex flex-col items-center justify-center mr-4">
                <div className="mb-2 text-sm text-center">
                  <label htmlFor="inline-radio" className="mb-4 text-sm font-medium text-gray-900">Mastercard</label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex items-center h-5">
                  <input type="radio" value="" name="pay" className="pay-radio"/>
                </div>
              </div>


              <div className="flex flex-col items-center justify-center mr-4">
                <div className="mb-2 text-sm text-center">
                  <label htmlFor="inline-radio" className="mb-4 text-sm font-medium text-gray-900">Mastercard</label>
                  <Image
                    src="/mastercard-logo.svg"
                    width={92}
                    height={64}
                    alt="logo"
                    className="my-3"
                  />
                </div>
                <div className="flex items-center h-5">
                  <input type="radio" value="" name="pay" className="pay-radio"/>
                </div>
              </div>


            </div>

          </div>


          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value=""
                   className="w-14 h-28 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
            <div className="ms-2 text-sm font-medium text-gray-900">
              Ich erkläre mich damit einverstanden, dass meine Bestellung rechtsverbindlich ist und dass ich die AGB
              sowie die Datenschutzrichtlinien von ALDI Deals gelesen und akzeptiert habe.
            </div>
          </div>
          <div className="flex items-center">
            <input id="checked-checkbox" type="checkbox" value=""
                   className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900">
              Ja, ich möchte den Newsletter erhalten und akzeptiere die Datenschutzrichtlinie sowie die
              Nutzungsbedingungen.
            </label>
          </div>


        </div>
        <div>
          <h1 className="font-bold text-2xl mb-3">Warenkorb Übersicht</h1>
          <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">
            <ProductItem name="Mud Masters Tickets" description="2 Tickets zum Preis von 1" price={45} count={2}
                         image="/img_1.png"></ProductItem>
            <ProductItem name="Mud Masters Tickets" description="2 Tickets zum Preis von 1" price={45} count={2}
                         image="/img_1.png"></ProductItem>
          </div>

          <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">

            <h1 className="font-bold text-xl mb-3">Rabattcode eingeben</h1>

            <div className="flex justify-between items-center">
              <Input type="text"
                     className="border-1 border-gray-300 rounded-full !bg-transparent hover:!bg-transparent"/>
              <Button className="ml-4 bg-slate-900 text-white rounded-full px-10">Anwenden</Button>
            </div>
          </div>


          <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">


            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl mb-3">Gesamtpreis inkl. MwSt.</h1>
              <Price price={45} discountedPrice={0} uvp={false} textSize={1} textColor={2}></Price>
            </div>
            <hr/>
            <div className="flex mt-5">
              <Button className="bg-slate-900 text-white rounded-full px-10 w-full">Jetzt kostenpflichtig
                abschliessen</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
