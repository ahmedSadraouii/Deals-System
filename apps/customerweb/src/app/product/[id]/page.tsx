'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Slider } from '@/components/home/slider';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { ProductCard } from '@/components/product/product-card';
import { ProductSlider } from '@/components/product/product-slider';
import { IconClock } from '@/components/svg/icon-clock';
import { IconMinus } from '@/components/svg/icon-minus';
import { IconPlus } from '@/components/svg/icon-plus';
import { IconTag } from '@/components/svg/icon-tag';

export default function Page() {
  const [isAlert] = useState(true);
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
                  Start
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
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
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
                  <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                    Mud Masters Tickets
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

            <div className="mb-10 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-3">
              <div className="flex items-center justify-center rounded-xl border px-2 py-4">
                <IconTag className="mr-3" />
                Tolles Angebot
              </div>

              <div className="flex items-center justify-center rounded-xl border px-2 py-4">
                <IconTag className="mr-3" />
                Outdoor Aktivität
              </div>

              <div className="flex items-center justify-center rounded-xl border px-2 py-4">
                <IconTag className="mr-3" />
                Perfekt als Geschenk
              </div>

              <div className="flex items-center justify-center rounded-xl border px-2 py-4">
                <IconTag className="mr-3" />
                Für die Familie
              </div>

              <div className="flex items-center justify-center rounded-xl border px-2 py-4">
                <IconTag className="mr-3" />
                Unsere Empfehlung
              </div>
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
              <div className="flex flex-auto items-center">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Mud Master Tickets - Jetzt 2 Tickets zum Preis von 1
                    sichern!
                  </h1>
                  <h2 className="mt-2 flex items-center text-base leading-7 text-gray-500">
                    Deal läuft ab in{' '}
                    <span className="ml-2 mr-2 flex items-center rounded-xl border bg-transparent p-2 text-aldi-key">
                      <IconClock className="mr-2" /> noch 5 Tage
                    </span>{' '}
                    oder bis ausverkauft
                  </h2>
                </div>
              </div>
              <hr className="mb-5 mt-5" />
              <p className="text-gray-400">
                Willkommen zu einem unvergleichlichen Abenteuer voller
                Nervenkitzel, Ausdauer und Gemeinschaftssinn – willkommen bei
                Mud Masters! Mit deinem Ticket erwartet dich nicht nur ein
                Hindernisrennen.
              </p>
              <hr className="mb-5 mt-5" />
              {isAlert && (
                <div className="mb-5 rounded-xl bg-aldi-bg p-5 text-aldi-key">
                  Aufgrund deines Standorts kannst du diesen Deal leider nicht
                  erwerben. Weitere Deals kannst du in deiner Aldi Nord Filiale
                  entdecken! Hier gehts zum Filialfinder:
                  https://www.aldi-nord.de/filialen-und-oeffnungszeiten.html
                </div>
              )}
              <div className="flex justify-between">
                <Price oldPrice={90} actualPrice={45} uvp={true} textSize={2} />
              </div>
              <div className="mt-10 flex justify-between">
                <div className="flex items-center justify-between gap-4 text-4xl font-bold">
                  <AldiButton
                    className="h-12 !w-12"
                    variant="ghost"
                    color="secondary"
                  >
                    <IconMinus />
                  </AldiButton>
                  <div className="font-bold">10</div>
                  <AldiButton
                    className="h-12 !w-12"
                    variant="ghost"
                    color="secondary"
                  >
                    <IconPlus />
                  </AldiButton>
                </div>
                <AldiButton color="secondary">Jetzt Deal sichern!</AldiButton>
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <div className="flex items-center justify-start">
                <div>
                  <img src="/img_1.png" alt="logo" className="w-20" />
                </div>
                <div className="ml-6">
                  <h1 className="text-base font-semibold text-gray-500">
                    Partner des Deals:
                  </h1>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    MudMasters Hindernislauf
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Slider name="todo" bg="todo" />
    </>
  );
}
