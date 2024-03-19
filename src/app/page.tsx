'use client';

import * as React from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LogoSlider } from '@/components/home/logo-slider';
import { Slider } from '@/components/home/slider';
import { ProductItem } from '@/components/product/product-item';

export default function Page() {
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex w-full items-center justify-between px-5">
          <h1 className="mb-4 text-4xl">Die neuesten Deals</h1>
          <div className="!w-20 text-3xl font-medium text-amber-500">
            <div id="containerForBullets" />
          </div>
        </div>
        <Swiper
          pagination={{
            el: '#containerForBullets',
            type: 'fraction',
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <div className="overflow-hidden p-5 ">
              <div className="mx-auto rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <img
                    src="/img.png"
                    alt="Product screenshot"
                    className="rounded-xl shadow-xl"
                  />
                  <div className="relative">
                    <h2 className="mb-5 text-base font-semibold leading-7 text-gray-500 md:hidden">
                      Noch{' '}
                      <span className="rounded-full bg-white p-2">
                        13:32:16
                      </span>{' '}
                      oder bis ausverkauft
                    </h2>

                    <div className="flex w-full flex-auto items-center justify-between">
                      <div className="flex items-center justify-center">
                        <div>
                          <img src="/img_1.png" alt="logo" className="w-20" />
                        </div>
                        <div className="ml-6">
                          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Mud Masters
                          </h1>
                          <h2 className="mt-2 hidden text-base font-semibold leading-7 text-gray-500 md:block">
                            Noch{' '}
                            <span className="rounded-full bg-white p-2">
                              13:32:16
                            </span>{' '}
                            oder bis ausverkauft
                          </h2>
                        </div>
                      </div>
                      <div>
                        <div className="hidden rounded-xl bg-amber-500 p-2 text-sm text-white md:block">
                          Stark nachgefragt!
                        </div>
                      </div>
                    </div>
                    <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                      <div className="relative">
                        <h1 className="text-3xl font-bold">
                          2 Tickets zum Preis von 1
                        </h1>
                        <p className="mt-6 hidden font-extralight leading-8 text-gray-600 md:block">
                          Willkommen zu einem unvergleichlichen Abenteuer voller
                          Nervenkitzel, Ausdauer und Gemeinschaftssinn –
                          willkommen bei Mud Masters! Mit deinem Ticket erwartet
                          dich nicht nur ein Hindernisrennen, sondern ein
                          Erlebnis, das deine Sinne schärfen und deine Grenzen
                          herausfordern wird.
                        </p>
                      </div>
                    </dl>
                    <div className="mt-10 flex hidden items-center justify-between md:flex">
                      <div className="rounded bg-aldi-bg px-7 py-4 text-2xl font-extrabold text-aldi-text">
                        Sie sparen 50%
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mt-10 flex items-center">
                        <span className="text-2xl font-extrabold text-aldi-text">
                          Jetzt!
                        </span>
                        <span className="ml-3 text-4xl font-bold text-aldi-text underline">
                          45€
                        </span>
                        <small className="-mt-4 ml-4 text-lg text-black line-through">
                          UVP 90€
                        </small>
                      </div>

                      <div className="flex w-full justify-start">
                        <a
                          href="#"
                          className="mt-5 w-full rounded-full bg-slate-900 px-5 py-3 text-center  text-sm leading-6 text-white md:w-1/4"
                        >
                          Jetzt Deal sichern!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="overflow-hidden p-5 ">
              <div className="mx-auto rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <img
                    src="/img.png"
                    alt="Product screenshot"
                    className="rounded-xl shadow-xl"
                  />
                  <div className="relative">
                    <div className="flex w-full flex-auto items-center justify-between">
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
                      <div>
                        <div className="rounded-xl bg-amber-500 p-2 text-sm text-white">
                          Stark nachgefragt!
                        </div>
                      </div>
                    </div>
                    <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                      <div className="relative">
                        <h1 className="text-3xl font-bold">
                          2 Tickets zum Preis von 1
                        </h1>
                        <p className="mt-6 font-extralight leading-8 text-gray-600">
                          Willkommen zu einem unvergleichlichen Abenteuer voller
                          Nervenkitzel, Ausdauer und Gemeinschaftssinn –
                          willkommen bei Mud Masters! Mit deinem Ticket erwartet
                          dich nicht nur ein Hindernisrennen, sondern ein
                          Erlebnis, das deine Sinne schärfen und deine Grenzen
                          herausfordern wird.
                        </p>
                      </div>
                    </dl>
                    <div className="mt-10 flex items-center justify-between">
                      <div className="rounded bg-aldi-bg px-7 py-4 text-2xl font-extrabold text-aldi-text">
                        Sie sparen 50%
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mt-10 flex items-center">
                        <span className="text-2xl font-extrabold text-aldi-text">
                          Jetzt!
                        </span>
                        <span className="ml-3 text-4xl font-bold text-aldi-text underline">
                          45€
                        </span>
                        <small className="-mt-4 ml-4 text-lg text-black line-through">
                          UVP 90€
                        </small>
                      </div>

                      <div className="flex w-full justify-start">
                        <a
                          href="#"
                          className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm leading-6  text-white"
                        >
                          Jetzt Deal sichern!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Slider name="Last minute deals" bg="gray" />
      <Slider name="Beliebt auf ALDI Deals" bg="white" />
      <Slider name="Nur Online verfügbar" bg="gray" />

      <section className="mt-10 w-full px-5 py-16">
        <div className="container mx-auto">
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">Alle Deals im Überblick</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <ProductItem
                  key={index}
                  image="/slider-train.png"
                  price={190}
                  discountPrice={0}
                />
              ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm leading-6 text-white"
            >
              Mehr anzeigen
            </a>
          </div>
          <div className="mt-5 text-center">
            <a
              href="#"
              className="rounded-full px-5 py-3 text-sm leading-6 underline"
            >
              Alle anzeigen
            </a>
          </div>
          <div className="mt-5 text-center">
            <p className="text-xs font-light">
              Angezeigt werden 8 von 16 Deals
            </p>
          </div>
        </div>
      </section>

      <LogoSlider name="Unsere Partner" bg="white" />
    </>
  );
}
