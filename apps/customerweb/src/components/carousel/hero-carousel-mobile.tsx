'use client';

import React, { useMemo, useState } from 'react';
import { CarouselMobile } from './carousel-mobile';
import type { CarouselProps } from '@/components/carousel/carousel';

export interface HeroCarouselProps extends CarouselProps {
  title: string;
}

export function HeroCarouselMobile({
  title,
  children,
  ...carouselProps
}: HeroCarouselProps) {
  const itemCount = useMemo(() => React.Children.count(children), [children]);
  const [itemStart, setItemStart] = useState(0);

  return (
    <>
      <CarouselMobile
        {...carouselProps}
        itemStart={itemStart}
        onItemChange={setItemStart}
        title={title}
      >
        {children}
      </CarouselMobile>
      <div className="mt-6 flex w-full items-center justify-center space-x-8">
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
    </>
  );
}
