import React from 'react';
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface LogoSliderProps {
  name: string;
  bg: string;
}

export function LogoSlider({ name, bg }: LogoSliderProps) {
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
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">{name}</h1>
            <div className="flex !w-20 justify-between text-3xl font-medium">
              <button
                type="button"
                className="prev rounded-full bg-black px-3 py-3 text-xs"
              >
                <img src="/icons/left-icon.svg" alt="left icon" />
              </button>
              <button
                type="button"
                className="next rounded-full bg-black px-3 py-3 text-xs"
              >
                <img src="/icons/right-icon.svg" alt="right icon" />
              </button>
            </div>
          </div>
          <div className="mb-10 h-1 w-full rounded-full bg-orange-200">
            <div
              className="h-1 rounded-full bg-amber-500"
              style={{ width: '5%' }}
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
                <Image
                  src={data.image}
                  width={130}
                  height={80}
                  alt="logo image"
                  className="mr-2"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
