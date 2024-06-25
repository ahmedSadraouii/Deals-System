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
        inputWrapper: 'border-neutral-900/40 bg-neutral-900/5',
        input: 'text-aldi-blue text-start',
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
