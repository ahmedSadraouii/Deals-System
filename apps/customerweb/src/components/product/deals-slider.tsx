'use client';

import React from 'react';
import { ProductItem } from './product-item';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

export function DealsSlider() {
  const data = [
    {
      id: '1',
      image: '/img_4.png',
      price: 100,
      discountPrice: 80,
    },
    {
      id: '2',
      image: '/img_4.png',
      price: 150,
      discountPrice: 120,
    },
    {
      id: '3',
      image: '/img_4.png',
      price: 200,
      discountPrice: 160,
    },
    {
      id: '4',
      image: '/img_4.png',
      price: 250,
      discountPrice: 200,
    },
    {
      id: '5',
      image: '/img_4.png',
      price: 300,
      discountPrice: 240,
    },
    {
      id: '6',
      image: '/img_4.png',
      price: 350,
      discountPrice: 280,
    },
    {
      id: '7',
      image: '/img_4.png',
      price: 400,
      discountPrice: 320,
    },
  ];

  return (
    <section className="bg-white-100 w-full px-5 py-16">
      <div className="container mx-auto">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="mb-4 text-4xl font-bold text-aldi-blue">
            DEALS der Woche
          </h1>
          <div className="flex justify-between gap-2">
            <button
              type="button"
              className="prev rounded-full bg-black p-2 text-lg"
            >
              <ChevronRightSvg className="rotate-180  text-white" />
            </button>
            <button
              type="button"
              className="next rounded-full bg-black p-2 text-lg"
            >
              <ChevronRightSvg className=" text-white" />
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
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
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
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex items-center justify-center gap-4">
                <ProductItem
                  price={item.price}
                  discountPrice={item.discountPrice}
                  image={item.image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
