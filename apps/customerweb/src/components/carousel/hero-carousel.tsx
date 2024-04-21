'use client';

import { useMemo, useState } from 'react';
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
  const itemCount = useMemo(() => Array.from(children).length, [children]);
  const [itemStart, setItemStart] = useState(0);
  return (
    <>
      <div className="flex flex-row items-center justify-between space-x-4 pb-10">
        <h2 className="text-5xl font-bold text-secondary">
          {title || 'Deals List Block Hero Slider Title'}
        </h2>
        <div className="flex flex-row space-x-8">
          <div className="text-3xl font-bold text-aldi-key">
            {itemStart + 1} / {itemCount}
          </div>
          <div className="flex flex-row items-center space-x-8">
            {Array(itemCount)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-20 rounded-full ${
                    itemStart === index
                      ? 'h-1.5 bg-aldi-key'
                      : 'h-1 bg-aldi-key/20'
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
