'use client';

import type { ReactNode } from 'react';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';
import { cn } from '@/utils/cn';

// Adjust the path as necessary

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
  const pathname = usePathname();

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

  // Check if the URL contains "/deal"
  const isDealPage = useMemo(() => pathname.includes('/deal'), [pathname]);

  return (
    <div className="relative">
      <div
        className={cn(
          'grid gap-4',
          itemsPerPage === 5
            ? `grid-cols-${itemsPerPage}`
            : `grid-cols-1 md:grid-cols-${itemsPerPage}`,
        )}
      >
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
          className={cn(
            'pointer-events-auto absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70',
            'left-0 -translate-x-1/2',
            isDealPage && 'hidden sm:block',
          )}
          onClick={onGoPrevious}
        >
          <ChevronRightSvg className="rotate-180 text-3xl" />
        </button>
      )}
      {_itemStart + itemsPerPage < itemCount && (
        <button
          className={cn(
            'pointer-events-auto absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-8 border-white bg-secondary p-2 text-white transition-opacity hover:opacity-70',
            'right-0 translate-x-1/2',
            isDealPage && 'hidden sm:block',
          )}
          onClick={onGoNext}
        >
          <ChevronRightSvg className="text-3xl" />
        </button>
      )}
    </div>
  );
}
