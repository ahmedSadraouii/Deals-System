'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import React from 'react';
import { Badge } from '@nextui-org/badge';
import { useCart } from '@/app/contexts/cart/use-cart';

export interface HeaderCartSectionProps {
  children: ReactNode;
}

export function HeaderCartSection({ children }: HeaderCartSectionProps) {
  const { cartContext } = useCart();
  const badgeContent = useMemo(() => {
    if (!cartContext.cart?.items) return undefined;
    if (cartContext.cart.items.length === 0) return undefined;
    return cartContext.cart.items.length;
  }, [cartContext.cart?.items]);
  return (
    <Badge content={badgeContent} color="primary">
      {children}
    </Badge>
  );
}
