// src/components/HeartFavorite.tsx
import React, { useCallback, useContext, useMemo } from 'react';
import { IconHeart } from './svg/icon-heart';
import {
  FavoriteContext,
  FavoriteContextActionKind,
} from '@/app/contexts/favorite/favorite-context';

interface HeartFavoriteProps {
  dealId: string;
}

export function HeartFavorite({ dealId }: HeartFavoriteProps) {
  const favoriteContext = useContext(FavoriteContext);

  const toggleFavorite = useCallback(
    (dealId: string) => {
      const isDealFavored = favoriteContext.favoredDealIds.includes(dealId);
      favoriteContext.dispatch({
        type: isDealFavored
          ? FavoriteContextActionKind.RemoveFavorite
          : FavoriteContextActionKind.AddFavorite,
        dealId,
      });
    },
    [favoriteContext],
  );

  const isFavored = useMemo(
    () => favoriteContext.favoredDealIds.includes(dealId),
    [dealId, favoriteContext.favoredDealIds],
  );

  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-light text-black"
      onClick={() => toggleFavorite(dealId)}
    >
      <IconHeart fill={isFavored ? 'orange' : 'orange-500'} />
    </span>
  );
}
