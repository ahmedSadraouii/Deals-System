'use client';

import Link from 'next/link';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';

export function CartToCheckoutButton() {
  const { cartContext } = useCart();
  if (!cartContext) return null;
  return (
    <AldiButton
      variant="solid"
      color="secondary"
      fullWidth={true}
      size="lg"
      as={Link}
      href="/cart/checkout"
      isDisabled={cartContext.cartExpired}
    >
      Zur Kasse
    </AldiButton>
  );
}
