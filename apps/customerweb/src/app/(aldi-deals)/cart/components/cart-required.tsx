'use client';

import type { ReactNode } from 'react';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';

export interface CartRequiredProps {
  children: ReactNode;
}

export function CartRequired({ children }: CartRequiredProps) {
  const { cartContext } = useCart();
  if (!cartContext.cart) {
    return null;
  }
  return children;
}
