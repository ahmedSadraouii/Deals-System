import { cn as cnOriginal } from '@nextui-org/react';
import type clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input: clsx.ClassValue[]): string {
  return twMerge(cnOriginal(input));
}
