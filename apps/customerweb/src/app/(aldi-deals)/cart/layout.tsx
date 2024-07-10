'use client';

import type { ReactNode } from 'react';
import { CartEmpty } from '@/app/(aldi-deals)/cart/components/cart-empty';
import { CartLoading } from '@/app/(aldi-deals)/cart/components/cart-loading';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';

export interface CartLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: CartLayoutProps) {
  const { cartContext } = useCart();

  if (!cartContext.cart) {
    return <CartLoading />;
  }

  if (cartContext.cart.items?.length === 0) {
    return <CartEmpty />;
  }

  return <div className="container mx-auto p-6">{children}</div>;
}
