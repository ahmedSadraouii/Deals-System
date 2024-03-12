import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import {Pagination, FreeMode, Navigation, Thumbs} from 'swiper/modules';

const ProductSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  const data = [
    {
      id: '1',
      name: 'Slider1',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    },
    {
      id: '2',
      name: 'Slider2',
      image: '/img.png',
    }
  ]
  let menu = ['Slide 1', 'Slide 2', 'Slide 3']
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((data, index) =>
          <SwiperSlide key={index}>
            <div className="md:h-[600px] h-[400px] !bg-center !bg-cover rounded-3xl"
                 style={{background: `url('${data.image}')`}}></div>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="relative mt-5">
        <Swiper
          onSwiper={setThumbsSwiper}
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
          {data.map((data, index) =>
            <SwiperSlide key={index}>
              <div className="md:h-[100px] h-[100px] !bg-center !bg-cover rounded-3xl"
                   style={{background: `url('${data.image}')`}}></div>
            </SwiperSlide>
          )}
          <button type="button"
                  className="prev h-10 w-10 bg-black rounded-full flex justify-center items-center absolute top-8 z-20">
            <img src="/icons/left-icon.svg" alt="left icon"/>
          </button>
          <button type="button"
                  className="next h-10 w-10 bg-black rounded-full flex justify-center items-center absolute top-8 right-0 z-20">
            <img src="/icons/right-icon.svg" alt="right icon"/>
          </button>
        </Swiper>
      </div>
    </>
  );
};

export default ProductSlider;
