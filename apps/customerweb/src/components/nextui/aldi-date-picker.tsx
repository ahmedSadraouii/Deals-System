'use client';

import { DatePicker, extendVariants } from '@nextui-org/react';

export const AldiDatePicker = extendVariants(DatePicker, {
  variants: {
    variant: {
      bordered: {
        input: 'border-1 border-secondary/50 h-unit-14',
        inputWrapper: 'border-1 border-secondary/50 h-unit-14',
      },
    },
  },
  defaultVariants: {
    variant: 'bordered',
    size: 'lg',
    radius: 'full',
  },
});
