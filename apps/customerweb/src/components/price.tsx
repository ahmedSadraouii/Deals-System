import React, { useMemo } from 'react';
import { tv } from '@nextui-org/react';
import { formatCurrency } from '@/utils/format-currency';

export interface PriceProps {
  oldPrice?: number;
  actualPrice: number;
  showDigits?: boolean;
  uvp: boolean;
  textSize?: 'default' | 1 | 2 | 3;
}

export function Price({
  oldPrice,
  actualPrice,
  showDigits = true,
  uvp,
  textSize = 'default',
}: PriceProps) {
  const priceText = tv({
    base: 'font-bold text-aldi-text flex items-center text-aldi-text',
    variants: {
      textSize: {
        default: 'text-3xl',
        1: 'text-2xl',
        2: 'text-5xl',
        3: 'text-[80px] mr-6',
      },
    },
    defaultVariants: {
      textSize: 'default',
    },
  });

  const uvpText = tv({
    base: 'font-light text-black line-through mr-2',
    variants: {
      textSize: {
        default: 'text-lg',
        1: 'text-lg',
        2: 'text-xl',
        3: 'text-4xl mr-6',
      },
    },
    defaultVariants: {
      textSize: 'default',
    },
  });

  const savingsText = tv({
    base: 'font-light ml-2',
    variants: {
      textSize: {
        default: 'text-sm',
        1: 'text-md',
        2: 'text-lg',
        3: 'text-xl font-normal ml-6',
      },
    },
  });

  const savingsPercentage = useMemo(
    () =>
      oldPrice !== undefined
        ? Math.ceil(((oldPrice - actualPrice) / oldPrice) * 100)
        : undefined,
    [oldPrice, actualPrice],
  );

  return (
    <div>
      <span className={priceText({ textSize })}>
        {oldPrice !== undefined && (
          <small className={uvpText({ textSize })}>
            {uvp ? 'UVP' : ''} {formatCurrency(oldPrice, showDigits)}
          </small>
        )}
        {formatCurrency(actualPrice, showDigits)}
        {actualPrice > 0 && (
          <small className={savingsText({ textSize })}>
            Du sparst {savingsPercentage}%
          </small>
        )}
      </span>
    </div>
  );
}
