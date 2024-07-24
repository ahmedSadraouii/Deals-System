'use client';

import type { MouseEvent } from 'react';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IconHeart } from './svg/icon-heart';
import {
  FavoriteContext,
  FavoriteContextActionKind,
} from '@/app/(aldi-deals)/contexts/favorite/favorite-context';
import { addFavoriteAction } from '@/app/(aldi-deals)/profile/actions/add-favorite.action';
import { deleteFavoriteAction } from '@/app/(aldi-deals)/profile/actions/delete-favorite.action';
import { cn } from '@/utils/cn';

interface HeartFavoriteProps {
  dealId: string;
}

export function HeartFavorite({ dealId }: HeartFavoriteProps) {
  const session = useSession();
  const router = useRouter();
  const iconRef = useRef<HTMLDivElement>(null);
  const favoriteContext = useContext(FavoriteContext);

  const handleFavoriteChange = useCallback(
    async (dealId: string, isAdding: boolean) => {
      try {
        if (isAdding) {
          await addFavoriteAction({ dealId });
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
    },
    [favoriteContext],
  );

  const toggleFavorite = useCallback(
    async (dealId: string) => {
      if (session.status !== 'authenticated') {
        router.push('/auth');
        return;
      }

      if (iconRef.current?.classList) {
        iconRef.current.classList.remove('animate-pop');
      }
      requestAnimationFrame(() => {
        if (iconRef.current?.classList) {
          iconRef.current.classList.add('animate-pop');
        }
      });

      const isDealFavored = favoriteContext.favoredDealIds.includes(dealId);

      // Optimistically update the context state
      favoriteContext.dispatch({
        type: isDealFavored
          ? FavoriteContextActionKind.RemoveFavorite
          : FavoriteContextActionKind.AddFavorite,
        dealId,
      });

      // Call the API to update the backend
      await handleFavoriteChange(dealId, !isDealFavored);
    },
    [favoriteContext, handleFavoriteChange, router, session.status],
  );

  const isFavored = useMemo(
    () => favoriteContext.favoredDealIds.includes(dealId),
    [dealId, favoriteContext.favoredDealIds],
  );

  const handleOnClick = useCallback(
    async (e: MouseEvent) => {
      await toggleFavorite(dealId);
      e.preventDefault();
    },
    [dealId, toggleFavorite],
  );

  return (
    <div
      className="pointer-events-auto h-12 w-12 cursor-pointer rounded bg-white md:rounded-full"
      ref={iconRef}
      onClick={handleOnClick}
    >
      <div className="flex h-full w-full items-center justify-center rounded bg-aldi-key/10 transition-colors hover:bg-aldi-key/20 md:rounded-full">
        <IconHeart
          className={cn('text-2xl text-aldi-key', isFavored && 'fill-aldi-key')}
        />
      </div>
    </div>
  );
}
