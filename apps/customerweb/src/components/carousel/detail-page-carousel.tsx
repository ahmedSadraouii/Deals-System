'use client';

import { useMemo, useState } from 'react';
import type { CarouselProps } from '@/components/carousel/carousel';
import { Carousel } from '@/components/carousel/carousel';

export function DetailPageCarousel({
  children,
  ...carouselProps
}: CarouselProps) {
  const itemCount = useMemo(() => Array.from(children).length, [children]);
  const [itemStart, setItemStart] = useState(0);
  return (
    <>
      <Carousel
        {...carouselProps}
        itemsPerPage={1}
        itemStart={itemStart}
        onItemChange={setItemStart}
      >
        {children}
      </Carousel>
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
                  itemStart === index ? 'h-1.5 bg-aldi-blue' : 'h-1 bg-blue-100'
                }`}
                onClick={() => setItemStart(index)}
              />
            ))}
        </div>
      </div>
    </>
  );
}