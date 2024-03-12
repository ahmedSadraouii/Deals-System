"use client";
import React from 'react';
import ProductSlider from "@/components/product/product-slider";
import Slider from "@/components/home/slider";
import Price from "@/components/price";
import ProductCard from "@/components/product/product-card";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="border-b flex justify-center items-center h-16">
        <div className="container mx-auto px-5">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link href="/"
                   className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 20 20">
                    <path
                      d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 9 4-4-4-4"/>
                  </svg>
                  <a href="#"
                     className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Product</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Mud Master</span>
                </div>
              </li>
            </ol>
          </nav>

        </div>
      </div>


      <div className="container mx-auto py-12 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="mb-10">
              <ProductSlider></ProductSlider>
            </div>

            <ProductCard title={"Beschreibung"} content={`"Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und Gemeinschaftssinn –
                willkommen bei Mud Masters! Mit deinem Ticket erwartet dich nicht nur ein Hindernisrennen, sondern ein
                Erlebnis, das deine Sinne schärfen und deine Grenzen herausfordern wird.  Begib dich auf eine epische Reise durch einen anspruchsvollen Parcours, der dich mit einer Vielzahl von
                Hindernissen aufwartet. Von tiefen Schlammgruben über steile Wände bis hin zu wackeligen Seilbrücken –
                jeder Meter des Parcours fordert deinen Mut, deine Kraft und deine Entschlossenheit heraus. Doch keine
                Sorge, du stehst nicht allein vor diesen Herausforderungen. Die Mud-Masters-Gemeinschaft ist voller`}></ProductCard>


            <ProductCard title={"Detail"} content={`Jeder einzelne Gutschein kann gegen ein Mud Master Ticket umgetauscht werden. Der Gutscheinwert von 90 €
                bezieht sich je nach Ort und Datum auf den maximal mit diesem Gutschein abgedeckten Gegenwert.
                Restbeträge bei Veranstaltungstagen, die den maximalen Gutscheinwert nicht erreichen, sind nicht
                auszahlbar.`}></ProductCard>


          </div>
          <div>
            <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6 mb-10">
              <div className="flex items-center justify-between mt-2.5 mb-5">
                <div className="flex items-center">
                  <div className="aldi-bg-color aldi-text-color font-extrabold rounded py-2 px-4 text-xs">Sie
                    sparen
                    50%
                  </div>
                </div>
                <span
                  className="bg-white text-black text-xs font-light px-4 py-2 rounded">Nur online verfügbar!</span>
              </div>
              <div className="flex flex-auto items-center">
                <div className="flex">
                  <div>
                    <img src="/img_1.png" alt="logo" className="w-20"/>
                  </div>
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mud Masters</h1>
                    <h2 className="text-base font-semibold leading-7 text-gray-500 mt-2">Noch <span
                      className="bg-white p-2 rounded-full">13:32:16</span> oder bis ausverkauft</h2>
                  </div>
                </div>
              </div>
              <hr className="mt-5 mb-10"/>
              <div className="flex justify-between">
                <div></div>
                <div>
                  <Price price={45} discountedPrice={90} uvp={true} textSize={2} textColor={2}></Price>
                </div>
              </div>
            </div>


            <div className="bg-gray-100 rounded-xl p-6 mb-10 text-center">
              <h1 className="font-bold text-xl mb-4">Sie brauchen Hilfe? Unser Kundendienst hilft Ihnen weiter!</h1>
              <a href="mailto:kundenservice@aldi-deals.d"
                 className="underline text-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                <img src="/icons/mail-footer-icon.svg" alt="" className="w-4 h-4 me-2"/>
                kundenservice@aldi-deals.d
              </a>
              <a href="mailto:kundenservice@aldi-deals.d"
                 className="underline text-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                <img src="/icons/info-icon.svg" alt="" className="w-4 h-4 me-2"/>
                Häufig gestellte Fragen (FAQ)
              </a>
            </div>
          </div>
        </div>
      </div>
      <Slider></Slider>
    </>
  );
};

export default Page;
