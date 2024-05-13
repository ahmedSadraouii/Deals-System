'use client';

import { Select, extendVariants } from '@nextui-org/react';

export const AldiSelect = extendVariants(Select, {
  variants: {},
  defaultVariants: {
    size: 'lg',
    radius: 'full',
  },
});
AldiSelect.displayName = 'AldiSelect';
