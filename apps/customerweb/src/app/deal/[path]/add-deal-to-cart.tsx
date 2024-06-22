'use client';

import React, { useCallback, useState } from 'react';
import { useCart } from '@/app/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconCart } from '@/components/svg/icon-cart';
import { toast } from '@/utils/toast';

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
    try {
      await updateCartItem(dealId, quantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: 'Fehler',
        description: 'Beim Hinzufügen zum Warenkorb ist ein Fehler aufgetreten',
      });
    } finally {
      setLoading(false);
    }
  }, [dealId, quantity, updateCartItem]);

  return (
    <>
      <AldiButton
        variant="ghost"
        isIconOnly={true}
        size="md"
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
        size="md"
        onClick={increment}
      >
        +
      </AldiButton>
      <AldiButton
        size="md"
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
