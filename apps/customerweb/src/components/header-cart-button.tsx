'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { AldiButton } from './nextui/aldi-button';
import { IconCart } from './svg/icon-cart';
import { trackCTA } from '@/utils/tracking';

export function HeaderCartButton() {
  const ctaText = 'zum warenkorb';
  const targetUrl = '/cart';
  const handleCtaClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
  }, [ctaText, targetUrl]);
  return (
    <AldiButton
      as={Link}
      size="lg"
      variant="flat"
      isIconOnly={true}
      href={targetUrl}
      className="h-12 w-12 text-secondary"
      onClick={handleCtaClick}
    >
      <IconCart className="text-2xl" />
    </AldiButton>
  );
}
