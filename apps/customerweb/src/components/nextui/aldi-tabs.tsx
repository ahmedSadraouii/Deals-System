'use client';

import { extendVariants, Tabs } from '@nextui-org/react';

export const AldiTabs = extendVariants(Tabs, {
  variants: {
    base: {
      base: {
        tab: 'px-8 text-xl',
      },
    },
  },
  defaultVariants: {
    base: 'base',
    size: 'lg',
    variant: 'underlined',
  },
});
AldiTabs.displayName = 'AldiTabs';
