'use client';

import { Select, extendVariants } from '@nextui-org/react';

export const AldiSelect = extendVariants(Select, {
  variants: {
    base: {
      base: {
        trigger: 'border-1 border-secondary/50 h-unit-14',
        value: 'text-white',
        label: 'text-white',
        popoverContent: 'bg-secondary text-white',
      },
    },
  },
  defaultVariants: {
    size: 'lg',
    radius: 'full',
    base: 'base',
  },
});
AldiSelect.displayName = 'AldiSelect';
