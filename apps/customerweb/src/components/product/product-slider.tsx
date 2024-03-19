'use client';

import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function ProductSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const data = [
    {
      id: '1',
      name: 'Slider1',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/aldi-online-shop-logo.png',
    },
  ];
  let menu = ['Slide 1', 'Slide 2', 'Slide 3'];
  return (
    <>
      <Swiper
        /*style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}*/
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((data, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[400px] rounded-3xl !bg-cover !bg-center md:h-[600px]"
              style={{ background: `url('${data.image}')` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative mt-5">
        <Swiper
          onSwiper={() => setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
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
              <div
                className="h-[100px] rounded-3xl !bg-cover !bg-center md:h-[100px]"
                style={{ background: `url('${data.image}')` }}
              />
            </SwiperSlide>
          ))}
          <button
            type="button"
            className="prev absolute top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black"
          >
            <img src="/icons/left-icon.svg" alt="left icon" />
          </button>
          <button
            type="button"
            className="next absolute right-0 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black"
          >
            <img src="/icons/right-icon.svg" alt="right icon" />
          </button>
        </Swiper>
      </div>
    </>
  );
}

export default ProductSlider;
