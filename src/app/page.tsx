"use client";
import * as React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination, Navigation} from 'swiper/modules';
import Slider from "@/components/home/slider";
import ProductItem from "@/components/product/product-item";
import LogoSlider from "@/components/home/logo-slider";


export default function Get({params, searchParams}: any) {
  const navigationPrevRef = React.useRef<HTMLDivElement>(null)
  const navigationNextRef = React.useRef<HTMLDivElement>(null)
  return (<>
      <div className="container mx-auto py-6">
        <div className="w-full flex justify-between items-center px-5">
          <h1 className="text-4xl mb-4">Die neuesten Deals</h1>
          <div className="!w-20 text-amber-500 text-3xl font-medium">
            <div id="containerForBullets"></div>
          </div>
        </div>
        <Swiper
          pagination={{
            el: "#containerForBullets",
            type: "fraction",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <div className="overflow-hidden p-5 ">

              <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6">
                <div
                  className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <img src="/img.png"
                       alt="Product screenshot"
                       className="rounded-xl shadow-xl"/>
                  <div className="relative">
                    <h2 className="text-base font-semibold leading-7 text-gray-500 mb-5 md:hidden">Noch <span
                      className="bg-white p-2 rounded-full">13:32:16</span> oder bis ausverkauft</h2>

                    <div className="flex flex-auto items-center justify-between w-full">
                      <div className="flex justify-center items-center">
                        <div>
                          <img src="/img_1.png" alt="logo" className="w-20"/>
                        </div>
                        <div className="ml-6">
                          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mud Masters</h1>
                          <h2
                            className="text-base font-semibold leading-7 text-gray-500 mt-2 hidden md:block">Noch <span
                            className="bg-white p-2 rounded-full">13:32:16</span> oder bis ausverkauft</h2>
                        </div>
                      </div>
                      <div>
                        <div className="bg-amber-500 rounded-xl p-2 text-white text-sm hidden md:block">Stark
                          nachgefragt!
                        </div>
                      </div>
                    </div>
                    <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                      <div className="relative">
                        <h1 className="text-3xl font-bold">2 Tickets zum Preis von 1</h1>
                        <p className="mt-6 font-extralight leading-8 text-gray-600 hidden md:block">
                          Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und
                          Gemeinschaftssinn
                          – willkommen bei Mud Masters! Mit deinem Ticket erwartet dich nicht nur ein Hindernisrennen,
                          sondern
                          ein Erlebnis, das deine Sinne schärfen und deine Grenzen herausfordern wird.
                        </p>
                      </div>
                    </dl>
                    <div className="flex items-center justify-between mt-10 hidden md:flex">
                      <div className="aldi-bg-color aldi-text-color font-extrabold rounded py-4 px-7 text-2xl">Sie
                        sparen
                        50%
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center mt-10">
                        <span className="aldi-text-color font-extrabold text-2xl">Jetzt!</span>
                        <span className="text-4xl font-bold aldi-text-color ml-3 underline">45€</span>
                        <small className="text-lg text-black line-through ml-4 -mt-4">UVP 90€</small>
                      </div>

                      <div className="flex justify-start w-full">
                        <a href="#"
                           className="text-sm leading-6 text-white bg-slate-900 rounded-full py-3 px-5  mt-5 w-full md:w-1/4 text-center">
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

              <div className="mx-auto px-6 lg:px-8 bg-gray-100 rounded-3xl py-6">
                <div
                  className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <img src="/img.png"
                       alt="Product screenshot"
                       className="rounded-xl shadow-xl"/>
                  <div className="relative">
                    <div className="flex flex-auto items-center justify-between w-full">
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
                      <div>
                        <div className="bg-amber-500 rounded-xl p-2 text-white text-sm">Stark nachgefragt!</div>
                      </div>
                    </div>
                    <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                      <div className="relative">
                        <h1 className="text-3xl font-bold">2 Tickets zum Preis von 1</h1>
                        <p className="mt-6 font-extralight leading-8 text-gray-600">
                          Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und
                          Gemeinschaftssinn
                          – willkommen bei Mud Masters! Mit deinem Ticket erwartet dich nicht nur ein Hindernisrennen,
                          sondern
                          ein Erlebnis, das deine Sinne schärfen und deine Grenzen herausfordern wird.
                        </p>
                      </div>
                    </dl>
                    <div className="flex items-center justify-between mt-10">
                      <div className="aldi-bg-color aldi-text-color font-extrabold rounded py-4 px-7 text-2xl">Sie
                        sparen
                        50%
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center mt-10">
                        <span className="aldi-text-color font-extrabold text-2xl">Jetzt!</span>
                        <span className="text-4xl font-bold aldi-text-color ml-3 underline">45€</span>
                        <small className="text-lg text-black line-through ml-4 -mt-4">UVP 90€</small>
                      </div>

                      <div className="flex justify-start w-full">
                        <a href="#"
                           className="text-sm leading-6 text-white bg-slate-900 rounded-full py-3 px-5  mt-5">
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

      <Slider name="Last minute deals" bg="gray"></Slider>
      <Slider name="Beliebt auf ALDI Deals" bg="white"></Slider>
      <Slider name="Nur Online verfügbar" bg="gray"></Slider>


      <section className="w-full py-16 mt-10 px-5">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center mb-5">
            <h1 className="text-4xl mb-4 font-bold">Alle Deals im Überblick</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <ProductItem data={{
              id: '1',
              name: 'Slider1',
              image: '/slider-train.png',
              price: 190,
              discountPrice: 0
            }}></ProductItem>

            <ProductItem data={{
              id: '1',
              name: 'Slider1',
              image: '/slider-train.png',
              price: 190,
              discountPrice: 0
            }}></ProductItem>

            <ProductItem data={{
              id: '1',
              name: 'Slider1',
              image: '/slider-train.png',
              price: 190,
              discountPrice: 0
            }}></ProductItem>

            <ProductItem data={{
              id: '1',
              name: 'Slider1',
              image: '/slider-train.png',
              price: 190,
              discountPrice: 0
            }}></ProductItem>

          </div>
          <div className="mt-10 text-center">
            <a href="#" className="text-sm leading-6 text-white bg-slate-900 rounded-full py-3 px-5">
              Mehr anzeigen
            </a>
          </div>
          <div className="mt-5 text-center">
            <a href="#" className="text-sm leading-6 rounded-full py-3 px-5 underline">
              Alle anzeigen
            </a>
          </div>
          <div className="mt-5 text-center">
            <p className="text-xs font-light">Angezeigt werden 8 von 16 Deals</p>
          </div>

        </div>
      </section>

      <LogoSlider name="Unsere Partner" bg="white"></LogoSlider>


    </>
  );
}
