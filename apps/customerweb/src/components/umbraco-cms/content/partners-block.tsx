'use client';

import React from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

export function PartnersBlock() {
  const data = [
    {
      id: '1',
      image: '/logos/facebook.svg',
    },
    {
      id: '2',
      image: '/logos/disney.svg',
    },
    {
      id: '2',
      image: '/logos/airbnb.svg',
    },
    {
      id: '2',
      image: '/logos/apple.svg',
    },
    {
      id: '2',
      image: '/logos/spark.svg',
    },
    {
      id: '2',
      image: '/logos/samsung.svg',
    },
    {
      id: '2',
      image: '/logos/quora.svg',
    },
  ] as const;
  return (
    <>
      <section className="bg-white-100 w-full px-5 py-16">
        <div className="container mx-auto">
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">Unsere Partner</h1>
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="prev rounded-full bg-black p-2 text-lg"
              >
                <ChevronRightSvg className="rotate-180 text-white" />
              </button>
              <button
                type="button"
                className="next rounded-full bg-black p-2 text-lg"
              >
                <ChevronRightSvg className="text-white" />
              </button>
            </div>
          </div>
          <div className="mb-10 flex h-1 w-full items-center rounded-full bg-aldi-key/20">
            <div className="h-1.5 w-16 rounded-full bg-aldi-key" />
          </div>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              1280: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            freeMode={true}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {data.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-16 items-center justify-center">
                  <img
                    src={data.image}
                    width={130}
                    height={80}
                    alt="logo image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
