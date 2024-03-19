'use client';
import React from 'react';
import Image from 'next/image';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

export interface FooterSliderProps {
  name: string;
  bg: string;
}

export function FooterSlider({name, bg}: FooterSliderProps) {
  const data = [
    {
      id: '1',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/disney.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/apple.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/spark.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg',
    },
    {
      id: '2',
      image: 'https://cruip-tutorials.vercel.app/logo-carousel/quora.svg',
    },
  ];
  return (
    <>
      <section className={`bg-${bg}-100 w-full px-5 py-16`}>
        <div className="container mx-auto">
          <div className="mb-5 flex w-full items-center justify-between text-center">
            <h1 className="mb-4 text-4xl font-bold">{name}</h1>
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
                slidesPerView: 1,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              1280: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
            }}
            freeMode={true}
            navigation={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {data.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-3xl">
                  <div>
                    <Image
                      src="/img_3.png"
                      width={800}
                      height={70}
                      alt="aldi sport logo"
                      className="mr-3"
                    />
                  </div>
                  <div className="p-5 flex flex-col  justify-center">
                    <h1 className="font-bold text-xl mb-3">Angebote im ALDI Onlineshop</h1>
                    <p>15% Rabatt auf alle ALDI SPORTS Produkte im ALDI SÜD Onlineshop</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
