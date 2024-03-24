'use client';

import { Checkbox, extendVariants } from '@nextui-org/react';

export const AldiCheckbox = extendVariants(Checkbox, {
  variants: {
    size: {
      lg: {
        wrapper: 'w-10 h-10 before:border-1 before:border-secondary/50',
      },
    },
    base: {
      base: {
        base: 'rounded-full',
        wrapper: 'mr-4',
      },
    },
    isInvalid: {
      true: {
        wrapper: 'before:border-danger',
      },
    },
  },
  defaultVariants: {
    base: 'base',
    size: 'lg',
    color: 'secondary',
  },
});
AldiCheckbox.displayName = 'AldiCheckbox';
