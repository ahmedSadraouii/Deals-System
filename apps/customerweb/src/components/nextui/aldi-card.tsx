'use client';

import { extendVariants, Card } from '@nextui-org/react';

export const AldiCard = extendVariants(Card, {
  variants: {
    base: {
      base: {
        base: 'bg-neutral-100 shadow-none',
      },
    },
  },
  defaultVariants: {
    base: 'base',
  },
});
AldiCard.displayName = 'AldiCard';
