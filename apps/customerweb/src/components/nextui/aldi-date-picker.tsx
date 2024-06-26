'use client';

import { DatePicker, extendVariants } from '@nextui-org/react';

export const AldiDatePicker = extendVariants(DatePicker, {
  variants: {
    base: {
      base: {
        base: '[&>div]:border-1 [&>div]:border-secondary/50',
      },
    },
  },
  defaultVariants: {
    size: 'lg',
    radius: 'full',
    base: 'base',
  },
});
