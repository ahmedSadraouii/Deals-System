'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { AldiCard } from '@/components/nextui/aldi-card';
import { trackCTA } from '@/utils/tracking';

export interface TrackableCardProps extends ComponentProps<typeof AldiCard> {
  link: string;
}
export function TrackableCard({
  link,
  children,
  ...cardProps
}: TrackableCardProps) {
  const trackCtaButtonClick = () => {
    trackCTA('Jetzt Deal sichern', link);
  };
  return (
    <Link href={link} onClick={trackCtaButtonClick}>
      <AldiCard {...cardProps} onClick={trackCtaButtonClick}>
        {children}
      </AldiCard>
    </Link>
  );
}
