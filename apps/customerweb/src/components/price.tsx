import React, { useMemo } from 'react';
import { tv } from '@nextui-org/react';
import { formatCurrency } from '@/utils/format-currency';

export interface PriceProps {
  price: number;
  discountedPrice: number;
  uvp: boolean;
  textSize?: 'default' | 1 | 2;
  textColor?: 1 | 2;
}

export function Price({
  price,
  discountedPrice,
  uvp,
  textSize = 'default',
  textColor = 1,
}: PriceProps) {
  const priceText = tv({
    base: 'font-bold text-aldi-text flex items-center',
    variants: {
      textSize: {
        default: 'text-3xl',
        1: 'text-2xl',
        2: 'text-5xl',
      },
      textColor: {
        1: 'text-gray-900',
        2: 'text-gray-900',
      },
    },
    defaultVariants: {
      textSize: 'default',
      textColor: 1,
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
      textColor: {
        1: 'text-aldi-text',
        2: 'text-gray-900',
      },
    },
    defaultVariants: {
      textSize: 'default',
      textColor: 1,
    },
  });

  const savingsPercentage = useMemo(
    () => Math.ceil(((price - discountedPrice) / price) * 100),
    [price, discountedPrice],
  );

  return (
    <div>
      <span className={priceText({ textSize, textColor })}>
        <small className={uvpText({ textSize, textColor })}>
          {uvp ? 'UVP' : ''}{' '}
          {discountedPrice > 0
            ? price
              ? formatCurrency(price)
              : formatCurrency(discountedPrice)
            : ''}
        </small>
        {discountedPrice
          ? formatCurrency(discountedPrice)
          : formatCurrency(price)}
        {discountedPrice > 0 && (
          <small className="ml-2 text-xs font-extralight">
            Sie sparen {savingsPercentage}%
          </small>
        )}
      </span>
    </div>
  );
}
