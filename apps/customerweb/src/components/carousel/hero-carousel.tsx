'use client';

import React, { useMemo, useState } from 'react';
import type { CarouselProps } from '@/components/carousel/carousel';
import { Carousel } from '@/components/carousel/carousel';

export interface HeroCarouselProps extends CarouselProps {
  title: string;
}

export function HeroCarousel({
  title,
  children,
  ...carouselProps
}: HeroCarouselProps) {
  const itemCount = useMemo(() => React.Children.count(children), [children]);
  const [itemStart, setItemStart] = useState(0);

  return (
    <>
      <div className="flex flex-col justify-between gap-4  pb-10 md:w-full lg:w-[90%] lg:flex-row lg:items-center">
        <h2 className="text-5xl font-bold text-secondary">
          {title || 'Deals List Block Hero Slider Title'}
        </h2>
        <div className="flex flex-row space-x-8">
          <div className="whitespace-nowrap text-3xl font-bold text-aldi-blue">
            {itemStart + 1} / {itemCount}
          </div>
          <div className="flex flex-row items-center space-x-8">
            {Array(itemCount)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-10 rounded-full lg:w-20 ${
                    itemStart === index
                      ? 'h-1.5 bg-aldi-blue'
                      : 'h-1 bg-blue-100'
                  }`}
                  onClick={() => setItemStart(index)}
                />
              ))}
          </div>
        </div>
      </div>
      <Carousel
        {...carouselProps}
        itemStart={itemStart}
        onItemChange={setItemStart}
      >
        {children}
      </Carousel>
    </>
  );
}
