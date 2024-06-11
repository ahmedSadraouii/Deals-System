'use client';

import React, { useContext } from 'react';
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
  async function addFavorite(dealId: string) {
    await favoritesApi.addUserFavorite({
      addFavoriteInputModel: { dealId },
    });
  }
  async function removeFavorite(dealId: string) {
    await favoritesApi.deleteUserFavorite({ dealId });
  }

  const toggleFavorite = async (dealId: string) => {
    const isDealFavored = favoriteContext.favoredDealIds.includes(dealId);

    try {
      if (isDealFavored) {
        await removeFavorite(dealId);
        favoriteContext.dispatch({
          type: FavoriteContextActionKind.RemoveFavorite,
          dealId,
        });
      } else {
        await addFavorite(dealId);
        favoriteContext.dispatch({
          type: FavoriteContextActionKind.AddFavorite,
          dealId,
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const isFavored = favoriteContext.favoredDealIds.includes(dealId);

  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-light text-black"
      onClick={() => toggleFavorite(dealId)}
    >
      <IconHeart fill={isFavored ? 'orange' : 'orange-500'} />
    </span>
  );
}
