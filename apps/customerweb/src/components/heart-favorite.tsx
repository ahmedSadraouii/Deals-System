'use client';

import React, { useCallback, useContext, useMemo } from 'react';
import { IconHeart } from './svg/icon-heart';
import {
  FavoriteContext,
  FavoriteContextActionKind,
} from '@/app/contexts/favorite/favorite-context';
import { addFavoriteAction } from '@/app/profile/actions/add-favorite-action';
import { deleteFavoriteAction } from '@/app/profile/actions/delete-favorite-action';

interface HeartFavoriteProps {
  dealId: string;
}

export function HeartFavorite({ dealId }: HeartFavoriteProps) {
  const favoriteContext = useContext(FavoriteContext);
  async function handleFavoriteChange(dealId: string, isAdding: boolean) {
    try {
      if (isAdding) {
        await addFavoriteAction({
          dealId,
        });
      } else {
        await deleteFavoriteAction({ dealId });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      // Revert the context state if the API call fails
      favoriteContext.dispatch({
        type: isAdding
          ? FavoriteContextActionKind.RemoveFavorite
          : FavoriteContextActionKind.AddFavorite,
        dealId,
      });
    }
  }

  const toggleFavorite = useCallback(
    async (dealId: string) => {
      const isDealFavored = favoriteContext.favoredDealIds.includes(dealId);

      // Optimistically update the context state
      favoriteContext.dispatch({
        type: isDealFavored
          ? FavoriteContextActionKind.RemoveFavorite
          : FavoriteContextActionKind.AddFavorite,
        dealId,
      });

      // Call the API to update the backend
      handleFavoriteChange(dealId, !isDealFavored);
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
      <IconHeart fill={isFavored ? '#ff4802' : '#ffcd73'} />
    </span>
  );
}
