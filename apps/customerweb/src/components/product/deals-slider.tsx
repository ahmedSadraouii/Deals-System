'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

interface DealsSliderProps {
  children: ReactNode[];
}

export function DealsSlider({ children }: DealsSliderProps) {
  const [progressWidth, setProgressWidth] = useState(16);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  // Function to handle slide change and update progress bar
  const handleSlideChange = useCallback(() => {
    const swiper = swiperRef.current;
    if (swiper && swiper.slides) {
      const totalSlides = swiper.slides.length;
      const activeIndex = swiper.activeIndex;
      const slideWidth = swiper.params.slidesPerView || 1;
      const slideProgress = (activeIndex + slideWidth) / totalSlides;
      setProgressWidth(slideProgress * 100);
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, []);

  return (
    <section className="w-full px-5 py-16">
      <div className="container mx-auto">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="mb-4 text-3xl font-bold text-aldi-blue md:text-4xl">
            DEALS der Woche
          </h1>
          <div className="flex justify-between gap-6">
            <button
              type="button"
              className={`prev h-12 w-12 rounded-full bg-secondary p-2 text-lg ${
                isBeginning ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={() => !isBeginning && swiperRef.current?.slidePrev?.()}
              disabled={isBeginning}
            >
              <ChevronRightSvg className="flex h-full w-full rotate-180 items-center justify-center text-white" />
            </button>
            <button
              type="button"
              className={`next h-12 w-12 rounded-full bg-secondary p-2 text-lg ${
                isEnd ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={() => !isEnd && swiperRef.current?.slideNext?.()}
              disabled={isEnd}
            >
              <ChevronRightSvg className="flex h-full w-full items-center justify-center text-white" />
            </button>
          </div>
        </div>
        <div className="mb-10 flex h-1 w-full items-center rounded-full bg-aldi-key/20">
          <div
            className="h-1.5 rounded-full bg-aldi-key"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <Swiper
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
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
