'use client';

import React from 'react';
import Image from 'next/image';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { Price } from '@/components/price';
import { IconClock } from '@/components/svg/icon-clock';
import { IconShare } from '@/components/svg/icon-share';
import { IconTag } from '@/components/svg/icon-tag';

export default function MainSlider() {
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex w-full items-center justify-between px-5">
          <h1 className="mb-4 text-4xl font-bold">Die neuesten Deals</h1>
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
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden p-5 ">
                  <div className="mx-auto rounded-3xl bg-gray-100 px-6 py-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                      <div className="relative">
                        <div className="absolute top-5 flex w-full justify-between px-5">
                          <span className="flex items-center rounded bg-gray-100 px-4 py-2 text-xs font-light text-black">
                            <IconShare className="mr-2 text-base" />
                            <span>Teilen</span>
                          </span>
                          <span className="flex items-center rounded bg-gray-100 px-4 py-2 text-xs font-light text-black">
                            <IconTag className="mr-2 text-base" />
                            <span>Stark nachgefragt</span>
                          </span>
                        </div>
                        <img
                          src="/img.png"
                          alt="Product screenshot"
                          className="rounded-xl shadow-xl"
                        />
                      </div>

                      <div className="relative">
                        <div className="flex w-full flex-auto items-center justify-between">
                          <div className="flex items-center justify-center">
                            <div>
                              <Image
                                src="/img_1.png"
                                width={80}
                                height={80}
                                alt="logo"
                              />
                            </div>
                            <div className="ml-6">
                              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Mud Masters
                              </h1>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-center rounded border px-6 py-6 text-xl text-aldi-key">
                              <IconClock className="mr-2" />
                              13:32:16
                            </div>
                          </div>
                        </div>
                        <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                          <div className="relative">
                            <h1 className="text-3xl font-bold">
                              2 Tickets zum Preis von 1
                            </h1>
                            <p className="mt-6 hidden font-extralight leading-8 text-gray-600 md:block">
                              Willkommen zu einem unvergleichlichen Abenteuer
                              voller Nervenkitzel, Ausdauer und
                              Gemeinschaftssinn – willkommen bei Mud Masters!
                              Mit deinem Ticket erwartet dich nicht nur ein
                              Hindernisrennen, sondern ein Erlebnis, das deine
                              Sinne schärfen und deine Grenzen herausfordern
                              wird.
                            </p>
                          </div>
                        </dl>
                        <div className="mt-10 w-full">
                          <Price
                            oldPrice={90}
                            actualPrice={45}
                            uvp={true}
                          ></Price>

                          <div className="mt-5 flex w-full justify-start">
                            <AldiButton color="secondary">
                              Jetzt Deal sichern!
                            </AldiButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
