'use client';

import { Dropdown, extendVariants } from '@nextui-org/react';

export const AldiDropdown = extendVariants(Dropdown, {
  slots: {
    content: 'bg-secondary',
  },
});
AldiDropdown.displayName = 'AldiDropdown';
