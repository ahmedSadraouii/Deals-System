import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import {Pagination, FreeMode, Navigation, Thumbs} from 'swiper/modules';
import Image from 'next/image'

const Slider = (props: { name: string, bg: string }) => {
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
  ]
  return (
    <>
      <section className={`bg-${props.bg}-100 w-full py-16 px-5`}>
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center mb-5">
            <h1 className="text-4xl mb-4 font-bold">{props.name}</h1>
            <div className="!w-20 text-3xl font-medium flex justify-between">
              <button type="button" className="prev bg-black px-3 py-3 rounded-full text-xs">
                <img src="/icons/left-icon.svg" alt="left icon"/>
              </button>
              <button type="button" className="next bg-black px-3 py-3 rounded-full text-xs">
                <img src="/icons/right-icon.svg" alt="right icon"/>
              </button>
            </div>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-1 mb-10">
            <div className="bg-amber-500 h-1 rounded-full" style={{width: '5%'}}></div>
          </div>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 6,
                spaceBetween: 30
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 6,
                spaceBetween: 40
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 6,
                spaceBetween: 40
              },
              // when window width is >= 640px
              1280: {
                slidesPerView: 6,
                spaceBetween: 40
              }
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
            {data.map((data, index) =>
              <SwiperSlide key={index}>
                <Image
                  src={data.image}
                  width={130}
                  height={80}
                  alt="logo image"
                  className="mr-2"
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slider;
