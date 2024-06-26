import React, { useMemo } from 'react';
import { tv } from '@nextui-org/react';
import { formatCurrency } from '@/utils/format-currency';

export interface PriceProps {
  oldPrice?: number;
  actualPrice: number;
  showDigits?: boolean;
  uvp: boolean;
  textSize?: 'default' | 1 | 2 | 3 | 4;
  badge?: 1 | 2 | 3;
  variant?: 'light' | 'dark';
}

export function Price({
  oldPrice,
  actualPrice,
  showDigits = true,
  uvp,
  textSize = 'default',
  badge = 1,
  variant = 'dark',
}: PriceProps) {
  const priceText = tv({
    base: 'font-bold text-aldi-key flex items-center text-aldi-key',
    variants: {
      textSize: {
        default: 'text-4xl',
        1: 'text-2xl',
        2: 'text-5xl',
        3: 'text-[80px] mr-6',
        4: 'text-[88px] mr-2',
      },
    },
    defaultVariants: {
      textSize: 'default',
    },
  });

  const uvpText = tv({
    base: 'font-light line-through mr-2',
    variants: {
      textSize: {
        default: 'text-lg',
        1: 'text-lg',
        2: 'text-xl',
        3: 'text-4xl mr-6',
        4: 'text-3xl mr-2',
      },
      variant: {
        default: 'dark',
        dark: 'text-secondary',
        light: 'text-white',
      },
    },
    defaultVariants: {
      textSize: 'default',
    },
  });

  const savingsText = tv({
    base: 'font-light ml-2 p-1 rounded',
    variants: {
      textSize: {
        default: 'text-sm',
        1: 'text-sm',
        2: 'text-sm',
        3: 'text-xl font-normal ml-6',
        4: 'text-xl font-normal ml-6',
      },
      badge: {
        default: 1,
        1: '',
        2: 'bg-orange-100 rounded-lg p-2',
        3: 'bg-aldi-key text-white rounded-lg p-2',
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
          <small className={uvpText({ textSize, variant })}>
            {uvp ? 'UVP' : ''} {formatCurrency(oldPrice, showDigits)}
          </small>
        )}
        {formatCurrency(actualPrice, showDigits)}
        {actualPrice > 0 && (
          <small className={`${savingsText({ textSize, badge })}`}>
            Du sparst {savingsPercentage}%
          </small>
        )}
      </span>
    </div>
  );
}
