'use client';

import { useCart } from '@/app/contexts/cart/use-cart';

export function EnsureCart() {
  useCart();
  return null;
}
