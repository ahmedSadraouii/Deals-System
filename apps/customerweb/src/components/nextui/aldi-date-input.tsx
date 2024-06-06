'use client';

import { DateInput, extendVariants } from '@nextui-org/react';

export const AldiDateInput = extendVariants(DateInput, {
  variants: {
    variant: {
      bordered: {
        inputWrapper: 'border-1 border-secondary/50 h-unit-14',
        input: 'text-aldi-blue',
      },
    },
  },
  defaultVariants: {
    variant: 'bordered',
    size: 'lg',
    radius: 'full',
  },
});
