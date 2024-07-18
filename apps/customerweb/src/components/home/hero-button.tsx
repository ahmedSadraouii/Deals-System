'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { trackCTA } from '@/utils/tracking';

export function HeroButton({ href }: { href: string }) {
  const ctaText = 'Jetzt Deal sichern';
  const targetUrl = href;
  const handleClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
  }, [ctaText, targetUrl]);

  return (
    <AldiButton
      as={Link}
      variant="solid"
      color="primary"
      endContent={<IconArrowRight />}
      href={href}
      onClick={handleClick}
      size="lg"
    >
      Jetzt Deal sichern
    </AldiButton>
  );
}
