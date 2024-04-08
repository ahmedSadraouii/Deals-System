import React, { useMemo } from 'react';
import { tv } from '@nextui-org/react';
import { formatCurrency } from '@/utils/format-currency';

export interface PriceProps {
  oldPrice?: number;
  actualPrice: number;
  showDigits?: boolean;
  uvp: boolean;
  textSize?: 'default' | 1 | 2;
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
      },
    },
    defaultVariants: {
      textSize: 'default',
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
          <small className="ml-2 text-sm font-light">
            Du sparst {savingsPercentage}%
          </small>
        )}
      </span>
    </div>
  );
}
