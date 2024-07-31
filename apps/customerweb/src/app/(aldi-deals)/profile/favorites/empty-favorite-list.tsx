'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export function EmptyFavoriteList() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <Image src="/note.png" alt="empty merkliste" width={120} height={120} />
      <div>
        <h1 className="m-0 text-center text-4xl font-bold text-secondary lg:text-5xl">
          Du hast noch keine DEALS auf deiner Merkliste!{' '}
        </h1>
        <p className="mt-2 text-center font-medium text-secondary/50">
          Du hast noch keine DEALS auf deiner Merkliste! Durchstöbere jetzt{' '}
          <span className="font-semibold underline">alle DEALS</span> und leg
          los.
        </p>
      </div>
      <AldiButton
        variant="solid"
        as={Link}
        href="/"
        color="secondary"
        size="lg"
      >
        DEALS entdecken{' '}
      </AldiButton>
    </div>
  );
}
