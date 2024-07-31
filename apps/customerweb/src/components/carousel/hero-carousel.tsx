'use client';

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

export interface CarouselProps {
  children: React.ReactNode;
  itemStart?: number;
  onItemChange?: (index: number) => void;
}

export function HeroCarousel({
  children,
  itemStart = 0,
  onItemChange,
}: CarouselProps) {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const itemCount = items.length;
  const [_itemStart, setItemStart] = useState(itemStart);

  const onGoPrevious = useCallback(() => {
    setItemStart((prev) => Math.max(0, prev - 1));
  }, []);

  const onGoNext = useCallback(() => {
    setItemStart((prev) => Math.min(itemCount - 1, prev + 1));
  }, [itemCount]);

  useEffect(() => {
    onItemChange?.(_itemStart);
  }, [_itemStart, onItemChange]);

  useEffect(() => {
    setItemStart(itemStart ?? 0);
  }, [itemStart]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-8 transition-transform duration-300"
        style={{
          transform: `translateX(-${_itemStart * 90}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              flex: itemCount > 1 ? '0 0 90%' : '0 0 100%',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      {_itemStart > 0 && (
        <button
          className="absolute left-0 top-1/2 z-50 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70"
          onClick={onGoPrevious}
        >
          <ChevronRightSvg className="rotate-180 text-3xl" />
        </button>
      )}
      {_itemStart < itemCount - 1 && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70"
          onClick={onGoNext}
        >
          <ChevronRightSvg className="text-3xl" />
        </button>
      )}
    </div>
  );
}
