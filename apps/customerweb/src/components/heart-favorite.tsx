// src/components/HeartFavorite.tsx
import React from 'react';
import { IconHeart } from './svg/icon-heart';
import { useFavorites } from '@/app/contexts/favorite/favorite-context';

interface HeartFavoriteProps {
  dealId: string;
}

export function HeartFavorite({ dealId }: HeartFavoriteProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const filled = isFavorite(dealId);

  return (
    <span
      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-light text-black"
      onClick={() => toggleFavorite(dealId)}
    >
      <IconHeart fill={filled ? 'orange' : 'orange-500'} />
    </span>
  );
}
