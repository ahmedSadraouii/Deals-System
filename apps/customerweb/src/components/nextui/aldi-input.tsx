'use client';

import { extendVariants, Input } from '@nextui-org/react';

export const AldiInput = extendVariants(Input, {
  variants: {
    color: {
      white: {
        inputWrapper: 'bg-white',
      },
    },
    variant: {
      bordered: {
        inputWrapper: 'border-1 border-secondary/50 h-unit-14',
        innerWrapper: 'group-data-[has-label=true]:items-center',
        input: 'text-aldi-blue',
        label:
          'group-data-[filled-within=true]:!scale-100 group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2)] px-1 bg-neutral-100',
      },
    },
    isReadOnly: {
      true: {
        inputWrapper: 'border-neutral-900/40 bg-neutral-900/5',
        input: 'text-aldi-blue text-start',
      },
    },
  },
  defaultVariants: {
    variant: 'bordered',
    size: 'lg',
    radius: 'full',
    labelPlacement: 'inside',
  },
});
AldiInput.displayName = 'AldiInput';
