'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { trackCTA } from '@/utils/tracking';

export function HeroButton({ href }: { href: string }) {
  const handleClick = useCallback(() => {
    trackCTA('Jetzt Deal sichern', href);
  }, [href]);

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
