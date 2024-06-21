'use client';

import React, { useCallback, useState } from 'react';
import { useCart } from '@/app/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconCart } from '@/components/svg/icon-cart';

export interface AddDealToCartProps {
  dealId: string;
}
export function AddDealToCart({ dealId }: AddDealToCartProps) {
  const { updateCartItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const increment = useCallback(
    () => setQuantity((oldQuantity) => oldQuantity + 1),
    [],
  );
  const decrement = useCallback(
    () => setQuantity((oldQuantity) => Math.max(1, oldQuantity - 1)),
    [],
  );

  const [isLoading, setLoading] = useState(false);
  const onAddToCart = useCallback(async () => {
    setLoading(true);
    await updateCartItem(dealId, quantity);
    setLoading(false);
  }, [dealId, quantity, updateCartItem]);

  return (
    <>
      <AldiButton
        variant="ghost"
        isIconOnly={true}
        size="lg"
        onClick={decrement}
      >
        -
      </AldiButton>
      <div className="min-w-8 text-center text-3xl font-bold text-secondary">
        {quantity}
      </div>
      <AldiButton
        variant="ghost"
        isIconOnly={true}
        size="lg"
        onClick={increment}
      >
        +
      </AldiButton>
      <AldiButton
        size="lg"
        className="grow"
        variant="solid"
        color="secondary"
        endContent={<IconCart className="shrink-0 text-2xl" />}
        onClick={onAddToCart}
        isLoading={isLoading}
      >
        In den Warenkorb
      </AldiButton>
    </>
  );
}
