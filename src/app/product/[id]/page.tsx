'use client';

import React from 'react';
import Link from 'next/link';
import { Slider } from '@/components/home/slider';
import { Price } from '@/components/price';
import { ProductCard } from '@/components/product/product-card';
import { ProductSlider } from '@/components/product/product-slider';

export default function Page() {
  return (
    <>
      <div className="flex h-16 items-center justify-center border-b">
        <div className="container mx-auto px-5">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="me-2.5 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path stroke="currentColor" d="m1 9 4-4-4-4" />
                  </svg>
                  <a
                    href="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Product
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path stroke="currentColor" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Mud Master
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="mb-10">
              <ProductSlider />
            </div>

            <ProductCard
              title={'Beschreibung'}
              content={`"Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und Gemeinschaftssinn –
                willkommen bei Mud Masters! Mit deinem Ticket erwartet dich nicht nur ein Hindernisrennen, sondern ein
                Erlebnis, das deine Sinne schärfen und deine Grenzen herausfordern wird.  Begib dich auf eine epische Reise durch einen anspruchsvollen Parcours, der dich mit einer Vielzahl von
                Hindernissen aufwartet. Von tiefen Schlammgruben über steile Wände bis hin zu wackeligen Seilbrücken –
                jeder Meter des Parcours fordert deinen Mut, deine Kraft und deine Entschlossenheit heraus. Doch keine
                Sorge, du stehst nicht allein vor diesen Herausforderungen. Die Mud-Masters-Gemeinschaft ist voller`}
            />

            <ProductCard
              title={'Detail'}
              content={`Jeder einzelne Gutschein kann gegen ein Mud Master Ticket umgetauscht werden. Der Gutscheinwert von 90 €
                bezieht sich je nach Ort und Datum auf den maximal mit diesem Gutschein abgedeckten Gegenwert.
                Restbeträge bei Veranstaltungstagen, die den maximalen Gutscheinwert nicht erreichen, sind nicht
                auszahlbar.`}
            />
          </div>
          <div>
            <div className="mx-auto mb-10 rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
              <div className="mb-5 mt-2.5 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded bg-aldi-bg px-4 py-2 text-xs font-extrabold text-aldi-text">
                    Sie sparen 50%
                  </div>
                </div>
                <span className="rounded bg-white px-4 py-2 text-xs font-light text-black">
                  Nur online verfügbar!
                </span>
              </div>
              <div className="flex flex-auto items-center">
                <div className="flex">
                  <div>
                    <img src="/img_1.png" alt="logo" className="w-20" />
                  </div>
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Mud Masters
                    </h1>
                    <h2 className="mt-2 text-base font-semibold leading-7 text-gray-500">
                      Noch{' '}
                      <span className="rounded-full bg-white p-2">
                        13:32:16
                      </span>{' '}
                      oder bis ausverkauft
                    </h2>
                  </div>
                </div>
              </div>
              <hr className="mb-10 mt-5" />
              <div className="flex justify-between">
                <div />
                <div>
                  <Price
                    price={45}
                    discountedPrice={90}
                    uvp={true}
                    textSize={2}
                    textColor={2}
                  />
                </div>
              </div>
            </div>

            <div className="mb-10 rounded-xl bg-gray-100 p-6 text-center">
              <h1 className="mb-4 text-xl font-bold">
                Sie brauchen Hilfe? Unser Kundendienst hilft Ihnen weiter!
              </h1>
              <a
                href="mailto:kundenservice@aldi-deals.d"
                className="text-dark mb-2 me-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium underline"
              >
                <img
                  src="/icons/mail-footer-icon.svg"
                  alt=""
                  className="me-2 h-4 w-4"
                />
                kundenservice@aldi-deals.d
              </a>
              <a
                href="mailto:kundenservice@aldi-deals.d"
                className="text-dark mb-2 me-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium underline"
              >
                <img
                  src="/icons/info-icon.svg"
                  alt=""
                  className="me-2 h-4 w-4"
                />
                Häufig gestellte Fragen (FAQ)
              </a>
            </div>
          </div>
        </div>
      </div>
      <Slider name="todo" bg="todo" />
    </>
  );
}
