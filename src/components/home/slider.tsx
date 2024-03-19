'use client';
import React from 'react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {SliderCard} from '@/components/home/slider-card';

export interface SliderProps {
  name: string;
  bg: string;
}

export function Slider({name, bg}: SliderProps) {
  const data = [
    {
      id: '1',
      name: 'Slider1',
      image: '/slider-train.png',
      price: 190,
      discountPrice: 0,
    },
    {
      id: '2',
      name: '/slider-train.png',
      image: '/aldi-online-shop-logo.png',
      price: 30,
      discountPrice: 15,
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
      price: 400,
      discountPrice: 300,
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
      price: 175,
      discountPrice: 85,
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
      price: 120,
      discountPrice: 90,
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
      price: 800,
      discountPrice: 640,
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
      price: 380,
      discountPrice: 300,
    },
  ];

  const randomClass = Math.floor(Math.random() * 9) + 1

  return (
    <>
      <section className={`bg-${bg}-100 w-full px-5 py-16`}>
        <div className="container mx-auto">
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">{name}</h1>
            <div className="flex !w-20 justify-between text-3xl font-medium">
              <button
                type="button"
                className={"prev rounded-full bg-black px-3 py-3 text-xs"}
              >
                <img src="/icons/left-icon.svg" alt="left icon"/>
              </button>
              <button
                type="button"
                className={`next rounded-full bg-black px-3 py-3 text-xs`}
              >
                <img src="/icons/right-icon.svg" alt="right icon"/>
              </button>
            </div>
          </div>
          <div className="mb-10 h-1 w-full rounded-full bg-orange-200">
            <div
              className="h-1 rounded-full bg-amber-500"
              style={{width: '5%'}}
            />
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
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              // when window width is >= 640px
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
            {data.map((data, index) => (
              <SwiperSlide key={index}>
                <SliderCard data={data}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
