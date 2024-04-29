'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo, useState } from 'react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';
import { cn } from '@/utils/cn';

export interface CarouselProps {
  children: Iterable<ReactNode>;
  itemStart?: number;
  itemsPerPage?: number;
  onItemChange?: (index: number) => void;
}

export function Carousel({
  children,
  itemStart = 0,
  itemsPerPage = 1,
  onItemChange,
}: CarouselProps) {
  const items = useMemo(() => Array.from(children), [children]);
  const itemCount = items.length;
  const [_itemStart, setItemStart] = useState(itemStart);

  const onGoPrevious = useCallback(() => {
    setItemStart((prev) => Math.max(0, prev - itemsPerPage));
  }, [itemsPerPage]);

  const onGoNext = useCallback(() => {
    setItemStart((prev) =>
      Math.min(itemCount - itemsPerPage, prev + itemsPerPage),
    );
  }, [itemCount, itemsPerPage]);

  useEffect(() => {
    onItemChange?.(_itemStart);
  }, [_itemStart, onItemChange]);

  useEffect(() => {
    setItemStart(itemStart ?? 1);
  }, [itemStart]);

  return (
    <div className="relative">
      <div className={cn('grid gap-4', `grid-cols-${itemsPerPage}`)}>
        {items.map((item, index) => {
          if (index < _itemStart || index >= _itemStart + itemsPerPage) {
            return (
              <div className="sr-only" key={index}>
                {item}
              </div>
            );
          }
          return <div key={index}>{item}</div>;
        })}
      </div>
      {_itemStart >= 1 && (
        <button
          className="pointer-events-auto absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70"
          onClick={onGoPrevious}
        >
          <ChevronRightSvg className="rotate-180 text-3xl" />
        </button>
      )}
      {_itemStart + itemsPerPage < itemCount && (
        <button
          className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70"
          onClick={onGoNext}
        >
          <ChevronRightSvg className="text-3xl" />
        </button>
      )}
    </div>
  );
}
