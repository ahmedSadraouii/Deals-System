'use client';

import { DropdownMenu, extendVariants } from '@nextui-org/react';

export const AldiDropdownMenu = extendVariants(DropdownMenu, {
  slots: {
    base: 'asd',
  },
});
AldiDropdownMenu.displayName = 'AldiDropdownMenu';
