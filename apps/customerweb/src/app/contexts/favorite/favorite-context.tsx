import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addFavoriteAction } from '@/app/profile/actions/add-favorite-action';
import { deleteFavoriteAction } from '@/app/profile/actions/delete-favorite-action';
import { getFavoritesAction } from '@/app/profile/actions/get-user-favorites';

interface FavoritesContextProps {
  favorites: Set<string>;
  toggleFavorite: (dealId: string) => Promise<void>;
  isFavorite: (dealId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const fetchFavorites = async () => {
    const response = await getFavoritesAction({ take: 100, skip: 0 });
    if (response.success && response.favorites) {
      const favoriteIds = response.favorites.map((fav: any) => fav.dealId);
      setFavorites(new Set(favoriteIds));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (dealId: string) => {
    if (favorites.has(dealId)) {
      await deleteFavoriteAction({ dealId });
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(dealId);
        return newFavorites;
      });
    } else {
      await addFavoriteAction({ dealId });
      setFavorites((prev) => new Set(prev).add(dealId));
    }
  };

  const isFavorite = (dealId: string) => {
    return favorites.has(dealId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
