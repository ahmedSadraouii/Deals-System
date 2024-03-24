'use client';

import { Button, extendVariants } from '@nextui-org/react';

export const AldiButton = extendVariants(Button, {
  variants: {
    variant: {
      ghost: 'border-secondary/10 border-1',
      solid: 'font-light',
    },
    size: {
      lg: 'py-7 text-xl',
    },
    base: {
      base: 'rounded-full',
    },
    isIconOnly: {
      true: 'w-10 h-10',
    },
  },
  compoundVariants: [
    {
      isIconOnly: true,
      size: 'lg',
      class: 'p-0 h-14 w-14',
    },
  ],
  defaultVariants: {
    base: 'base',
    size: 'lg',
  },
});
AldiButton.displayName = 'AldiButton';
