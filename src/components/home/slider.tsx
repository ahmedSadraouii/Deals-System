import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import {Pagination, FreeMode, Navigation, Thumbs} from 'swiper/modules';
import Price from "@/components/price";

const Slider = () => {
  const data = [
    {
      id: '1',
      name: 'Slider1',
      image: '/slider-train.png',
    },
    {
      id: '2',
      name: '/slider-train.png',
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
  return (
    <>
      <section className="bg-gray-100 w-full py-16 mt-10 px-5">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center mb-5">
            <h1 className="text-4xl mb-4 font-bold">Last minute deals</h1>
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
                <div
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                    <div className="md:h-[300px] h-[300px] !bg-center !bg-cover rounded-lg"
                         style={{background: `url('${data.image}')`}}></div>
                  </a>
                  <div className="px-5 pb-5">
                    <div className="flex items-center justify-between mt-2.5 mb-5">
                        <span
                          className="bg-gray-100 text-black text-xs font-light px-4 py-2 rounded">Last minute!
                        </span>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse ms-3">
                        <div className="aldi-bg-color aldi-text-color font-extrabold rounded py-2 px-4 text-xs">Sie
                          sparen
                          50%
                        </div>
                      </div>
                    </div>
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                        Köln - Hamburg für 2 Personen – 2 für 1 Tickets!
                      </h5>
                    </a>
                    <div className="flex items-center justify-between mt-5">
                      <a href="#" className="text-sm leading-6 text-white bg-slate-900 rounded-full py-3 px-5">
                        Jetzt Deal sichern!
                      </a>
                      <Price price={15} discountedPrice={30} textSize={1} uvp={false} textColor={1}></Price>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slider;
