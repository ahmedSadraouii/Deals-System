'use client';

import React, { useCallback, useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { IconHeart } from './svg/icon-heart';
import {
  FavoriteContext,
  FavoriteContextActionKind,
} from '@/app/contexts/favorite/favorite-context';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

interface HeartFavoriteProps {
  dealId: string;
}

export function HeartFavorite({ dealId }: HeartFavoriteProps) {
  const favoriteContext = useContext(FavoriteContext);
  const { data: session } = useSession();
  const favoritesApi = getFavoritesApiClient({
    accessToken: session?.accessToken,
  });

  async function handleFavoriteChange(dealId: string, isAdding: boolean) {
    try {
      if (isAdding) {
        await favoritesApi.addUserFavorite({
          addFavoriteInputModel: { dealId },
        });
      } else {
        await favoritesApi.deleteUserFavorite({ dealId });
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
