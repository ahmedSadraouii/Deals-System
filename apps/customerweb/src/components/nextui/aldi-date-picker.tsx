'use client';

import { DatePicker, extendVariants } from '@nextui-org/react';

export const AldiDatePicker = extendVariants(DatePicker, {
  variants: {
    base: {
      base: {
        base: '[&>div]:border-1 [&>div]:border-secondary/50',
      },
    },
    isReadOnly: {
      true: {
        /*
        inputWrapper: 'border-neutral-900/40 bg-neutral-900/5',
        input: 'text-aldi-blue text-start',*/
        base: '[&>div]:border-neutral-900/40 [&>div]:bg-neutral-900/5',
      },
    },
  },
  defaultVariants: {
    size: 'lg',
    radius: 'full',
    base: 'base',
  },
});
