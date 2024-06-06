'use client';

import { Button, extendVariants } from '@nextui-org/react';

export const AldiButton = extendVariants(Button, {
  variants: {
    variant: {
      ghost: 'border-secondary/10 border-1',
      solid: 'font-light',
      outline: 'border-orange-600 border-1',
    },
    size: {
      lg: 'px-4 py-7 text-xl',
    },
    base: {
      base: 'rounded-full',
    },
    isIconOnly: {
      true: 'w-10 h-10',
    },
    color: {
      orange: 'text-orange-600',
    },
    'data-is-user-button': {
      true: 'min-w-0 px-0 !gap-0 space-x-0 lg:space-x-4',
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
