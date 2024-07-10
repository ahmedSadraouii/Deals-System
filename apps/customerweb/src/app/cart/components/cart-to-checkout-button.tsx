'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import { trackCTA } from '@/utils/tracking';

export function CartToCheckoutButton() {
  const { cartContext } = useCart();
  const targetUrl = '/cart/checkout';
  const ctaText = 'Zur Kasse';
  const handleCtaClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
  }, [ctaText, targetUrl]);
  if (!cartContext) return null;

  return (
    <AldiButton
      variant="solid"
      color="secondary"
      fullWidth={true}
      size="lg"
      as={Link}
      href={targetUrl}
      isDisabled={cartContext.cartExpired}
      onClick={handleCtaClick}
    >
      Zur Kasse
    </AldiButton>
  );
}
