'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@nextui-org/react';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconCart } from '@/components/svg/icon-cart';
import { toast } from '@/utils/toast';

export interface AddDealToCartProps {
  dealId: string;
  maxCustomerQuantity: number;
}
export function AddDealToCart({
  dealId,
  maxCustomerQuantity,
}: AddDealToCartProps) {
  const { cartContext, updateCartItem } = useCart();
  const session = useSession();

  const [quantity, setQuantity] = useState(1);
  const increment = useCallback(
    () => setQuantity((oldQuantity) => oldQuantity + 1),
    [],
  );
  const decrement = useCallback(
    () => setQuantity((oldQuantity) => Math.max(1, oldQuantity - 1)),
    [],
  );

  const existingCartItemQuantity = useMemo(
    () =>
      (cartContext.cart?.items || []).find(
        (cartItem) => cartItem.dealId === dealId,
      )?.quantity || 0,
    [cartContext.cart?.items, dealId],
  );

  const [isLoading, setLoading] = useState(false);
  const onAddToCart = useCallback(async () => {
    setLoading(true);
    try {
      await updateCartItem(dealId, existingCartItemQuantity + quantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: 'Fehler',
        description: 'Beim Hinzufügen zum Warenkorb ist ein Fehler aufgetreten',
      });
    } finally {
      setLoading(false);
      setQuantity(1);
    }
  }, [dealId, existingCartItemQuantity, quantity, updateCartItem]);

  if (
    session.status === 'authenticated' &&
    session.data.user.cardinalDirection !== 1
  ) {
    return (
      <div className="rounded-lg bg-primary/10 p-4 text-primary">
        Aufgrund deines Standorts kannst du diesen Deal leider nicht erwerben.
        Weitere Deals kannst du in deiner ALDI SÜD Filiale entdecken! Hier gehts
        zum Filialfinder:{' '}
        <Link
          href="https://www.aldi-nord.de/filialen-und-oeffnungszeiten.html"
          underline="always"
        >
          https://www.aldi-nord.de/filialen-und-oeffnungszeiten.html
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-md text-center text-secondary/50">
        Maximal {maxCustomerQuantity} Deals pro Bestellung
      </div>
      <div className="hidden flex-row items-center gap-4 lg:flex">
        <AldiButton
          variant="ghost"
          color="primary"
          isIconOnly={true}
          size="lg"
          onClick={decrement}
          isDisabled={quantity <= 1}
        >
          -
        </AldiButton>
        <div className="min-w-8 text-center text-3xl font-bold text-primary">
          {quantity}
        </div>
        <AldiButton
          variant="ghost"
          color="primary"
          isIconOnly={true}
          size="lg"
          onClick={increment}
          isDisabled={
            existingCartItemQuantity + quantity >= maxCustomerQuantity
          }
        >
          +
        </AldiButton>
        <AldiButton
          size="lg"
          className="grow"
          variant="solid"
          color="primary"
          endContent={<IconCart className="shrink-0 text-2xl" />}
          onClick={onAddToCart}
          isLoading={isLoading}
          isDisabled={existingCartItemQuantity + quantity > maxCustomerQuantity}
        >
          In den Warenkorb
        </AldiButton>
      </div>
    </>
  );
}
