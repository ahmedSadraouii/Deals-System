'use client';

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';

export interface CarouselProps {
  children: React.ReactNode;
  itemStart?: number;
  itemsPerPage?: number;
  title?: string;
  onItemChange?: (index: number) => void;
}

export function CarouselMobile({
  children,
  itemStart = 0,
  itemsPerPage = 1,
  title,
  onItemChange,
}: CarouselProps) {
  const items = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
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
    setItemStart(itemStart ?? 0);
  }, [itemStart]);

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-secondary md:text-3xl">
          {title || 'Die neuesten DEALS'}
        </h1>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            className={`h-12 w-12 rounded-full p-2 text-lg ${
              _itemStart === 0
                ? 'cursor-not-allowed bg-secondary opacity-50'
                : 'bg-secondary'
            }`}
            onClick={onGoPrevious}
            disabled={_itemStart === 0}
          >
            <ChevronRightSvg className="flex h-full w-full rotate-180 items-center justify-center text-white" />
          </button>
          <button
            type="button"
            className={`h-12 w-12 rounded-full p-2 text-lg ${
              _itemStart + itemsPerPage >= itemCount
                ? 'cursor-not-allowed bg-secondary opacity-50'
                : 'bg-secondary'
            }`}
            onClick={
              _itemStart + itemsPerPage >= itemCount ? undefined : onGoNext
            }
            disabled={_itemStart + itemsPerPage >= itemCount}
          >
            <ChevronRightSvg className="flex h-full w-full items-center justify-center text-white" />
          </button>
        </div>
      </div>
      <div
        className={
          itemsPerPage === 5
            ? `grid-cols-${itemsPerPage} grid gap-4`
            : `grid grid-cols-1 gap-4 md:grid-cols-${itemsPerPage}`
        }
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
    </div>
  );
}
