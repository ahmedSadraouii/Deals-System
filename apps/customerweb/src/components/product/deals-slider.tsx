'use client';

import type { ReactNode } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

interface DealsSliderProps {
  children: ReactNode[]; // Adjusted type to expect an array of ReactNode
}

export function DealsSlider({ children }: DealsSliderProps) {
  return (
    <section className="w-full px-5 py-16">
      <div className="container mx-auto">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="mb-4 text-4xl font-bold text-aldi-blue">
            DEALS der Woche
          </h1>
          <div className="flex justify-between gap-6">
            <button
              type="button"
              className="prev rounded-full bg-secondary p-2 text-lg"
            >
              <ChevronRightSvg className="rotate-180  text-white" />
            </button>
            <button
              type="button"
              className="next rounded-full bg-secondary p-2 text-lg"
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
              slidesPerView: 1,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3.3,
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
          {children.map((child, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center gap-0">
                {child}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
