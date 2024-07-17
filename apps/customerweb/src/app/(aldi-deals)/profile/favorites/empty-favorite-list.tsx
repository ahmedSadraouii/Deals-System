'use client';

import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowLeft } from '@/components/svg/icon-arrow-left';
import { trackCTA } from '@/utils/tracking';

export function EmptyFavoriteList() {
  return (
    <div className="flex flex-col items-center gap-4 text-secondary/50">
      <span>Du hast noch keine Deals gemerkt.</span>

      <AldiButton
        as={Link}
        size="lg"
        variant="ghost"
        href="/"
        startContent={<IconArrowLeft className="text-2xl" />}
        color="secondary"
        onClick={() => trackCTA('zurück zur startseite', '/')}
      >
        Zurück zur Startseite
      </AldiButton>
    </div>
  );
}
