'use client';

import { Select, extendVariants } from '@nextui-org/react';

export const AldiSelect = extendVariants(Select, {
  variants: {
    color: {
      aldiblue: {
        trigger:
          'text-white bg-aldi-blue hover:bg-aldi-blue data-[hover=true]:bg-aldi-blue data-[hover=true]:opacity-80',
        value: 'text-white',
        label: 'text-white',
        popoverContent: 'bg-aldi-blue text-white',
      },
    },
  },
  defaultVariants: {
    size: 'lg',
    radius: 'full',
  },
});
AldiSelect.displayName = 'AldiSelect';
