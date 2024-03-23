'use client';

import { Button, extendVariants } from '@nextui-org/react';

export const AldiButton = extendVariants(Button, {
  variants: {
    variant: {
      ghost: 'border-secondary/10 border-1',
    },
    base: {
      base: 'font-medium rounded-full',
    },
  },
  defaultVariants: {
    base: 'base',
  },
});
AldiButton.displayName = 'AldiButton';
