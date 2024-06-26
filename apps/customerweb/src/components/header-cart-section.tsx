'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import React from 'react';
import { Badge } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { useCart } from '@/app/contexts/cart/use-cart';

export interface HeaderCartSectionProps {
  children: ReactNode;
}

export function HeaderCartSection({ children }: HeaderCartSectionProps) {
  const { cartContext } = useCart();
  const [isCartExpired, setCartExpired] = useState(false);
  const badgeContent = useMemo(() => {
    if (isCartExpired) return undefined;
    if (!cartContext.cart?.items) return undefined;
    if (cartContext.cart.items.length === 0) return undefined;
    const cartItemQuantity = cartContext.cart.items
      .flatMap((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);
    return cartItemQuantity === 0 ? undefined : cartItemQuantity;
  }, [cartContext.cart?.items, isCartExpired]);

  useEffect(() => {
    if (!cartContext.cart?.availableTill) return;
    const cartExpiryTime = DateTime.fromJSDate(cartContext.cart.availableTill);
    const now = DateTime.now();
    setCartExpired(cartExpiryTime < now);
    // if the expiry time is in the future, set a timeout to recheck the expiry time
    if (cartExpiryTime > now) {
      const timeout = setTimeout(() => {
        setCartExpired(cartExpiryTime < DateTime.now());
      }, cartExpiryTime.diff(now).as('milliseconds'));
      return () => clearTimeout(timeout);
    }
  }, [cartContext.cart?.availableTill, cartContext.cart?.items]);

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
