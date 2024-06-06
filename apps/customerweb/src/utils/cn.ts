import { cn as cnOriginal } from '@nextui-org/react';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input: ClassValue[]): string {
  return twMerge(cnOriginal(input));
}
