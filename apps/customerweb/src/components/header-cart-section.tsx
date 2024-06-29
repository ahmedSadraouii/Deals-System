'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import React from 'react';
import { Badge } from '@nextui-org/react';
import { useCart } from '@/app/contexts/cart/use-cart';

export interface HeaderCartSectionProps {
  children: ReactNode;
}

export function HeaderCartSection({ children }: HeaderCartSectionProps) {
  const { cartContext } = useCart();
  const badgeContent = useMemo(() => {
    if (cartContext.cartExpired) return undefined;
    if (!cartContext.cart?.items) return undefined;
    if (cartContext.cart.items.length === 0) return undefined;
    const cartItemQuantity = cartContext.cart.items
      .flatMap((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);
    return cartItemQuantity === 0 ? undefined : cartItemQuantity;
  }, [cartContext.cart?.items, cartContext.cartExpired]);

  return (
    <Badge
      content={badgeContent}
      classNames={{
        badge: badgeContent && 'w-6 h-6 text-sm',
      }}
      color="primary"
      placement="bottom-right"
      suppressHydrationWarning={true}
    >
      {children}
    </Badge>
  );
}
