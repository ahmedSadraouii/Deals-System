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
      image: '/img_3.png',
      name: 'Angebote im ALDI Onlineshop',
      description: '15% Rabatt auf alle ALDI SPORTS Produkte im ALDI SÜD Onlineshop',
      link: '',
    },
    {
      id: '2',
      image: '/img_3.png',
      name: 'Angebote im ALDI Onlineshop',
      description: '15% Rabatt auf alle ALDI SPORTS Produkte im ALDI SÜD Onlineshop',
      link: '',
    },
    {
      id: '3',
      image: '/img_3.png',
      name: 'Angebote im ALDI Onlineshop',
      description: '15% Rabatt auf alle ALDI SPORTS Produkte im ALDI SÜD Onlineshop',
      link: '',
    },
  ];
  return (
    <>
      <section className={`bg-${bg}-100 w-full px-5 py-16`}>
        <div className="container mx-auto">
          <div className="mb-5 w-full items-center justify-between text-center">
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
                      src={data.image}
                      width={800}
                      height={70}
                      alt="aldi sport logo"
                      className="mr-3"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <Image
                      src="/logos/aldi-online-shop-logo.png"
                      width={150}
                      height={70}
                      alt="aldi sport logo"
                      className="mb-4"
                    />
                    <h1 className="font-bold text-xl mb-3">{data.name}</h1>
                    <p>{data.description}</p>
                    <button className="mt-4 bg-orange-600 p-2 rounded-full text-white max-w-sm">Jetzt entdecken</button>
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
