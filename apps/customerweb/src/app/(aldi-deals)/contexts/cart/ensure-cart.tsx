'use client';

import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';

export function EnsureCart() {
  useCart();
  return null;
}
