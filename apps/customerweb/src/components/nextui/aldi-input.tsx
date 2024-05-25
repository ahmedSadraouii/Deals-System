'use client';

import { extendVariants, Input } from '@nextui-org/react';

export const AldiInput = extendVariants(Input, {
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
AldiInput.displayName = 'AldiInput';
