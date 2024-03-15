import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import {Pagination, FreeMode, Navigation, Thumbs} from 'swiper/modules';
import Price from "@/components/price";
import SliderCard from "@/components/home/slider-card";

const Slider = (props: { name: string, bg: string }) => {
  const data = [
    {
      id: '1',
      name: 'Slider1',
      image: '/slider-train.png',
      price: 190,
      discountPrice: 0
    },
    {
      id: '2',
      name: '/slider-train.png',
      image: '/img.png',
      price: 30,
      discountPrice: 15
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
      price: 400,
      discountPrice: 300
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
      price: 175,
      discountPrice: 85
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
      price: 120,
      discountPrice: 90
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
      price: 800,
      discountPrice: 640
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
      price: 380,
      discountPrice: 300
    }
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
                slidesPerView: 3,
                spaceBetween: 30
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              // when window width is >= 640px
              1280: {
                slidesPerView: 4,
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
                <SliderCard data={data}></SliderCard>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slider;
