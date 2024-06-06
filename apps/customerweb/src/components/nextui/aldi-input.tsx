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
    readOnly: {
      true: {
        inputWrapper: 'border-gray-900/40 bg-gray-900/5',
        input: 'text-gray-900/80',
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
