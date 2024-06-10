'use client';

import type { Dispatch, ReactNode } from 'react';
import { createContext, useReducer } from 'react';

export enum FavoriteContextActionKind {
  AddFavorite = 'addFavorite',
  RemoveFavorite = 'removeFavorite',
}

export type FavoriteContextAction =
  | {
      type: FavoriteContextActionKind.AddFavorite;
      dealId: string;
    }
  | {
      type: FavoriteContextActionKind.RemoveFavorite;
      dealId: string;
    };

export interface FavoriteContextState {
  favoredDealIds: Array<string>;
}

export interface FavoriteContextInterface extends FavoriteContextState {
  dispatch: Dispatch<FavoriteContextAction>;
}

export const FavoriteContext = createContext<FavoriteContextInterface>({
  favoredDealIds: [],
  dispatch: () => {
    throw new Error('FavoriteContext not initialized');
  },
});

interface FavoriteContextProviderProps {
  children: ReactNode;
  initialFavoredDealIds: Array<string>;
}

export function FavoriteContextProvider({
  children,
  initialFavoredDealIds = [],
}: FavoriteContextProviderProps) {
  const [state, dispatch] = useReducer(
    (state: FavoriteContextState, action: FavoriteContextAction) => {
      switch (action.type) {
        case FavoriteContextActionKind.AddFavorite:
          return {
            ...state,
            favoredDealIds: state.favoredDealIds.includes(action.dealId)
              ? state.favoredDealIds
              : [...state.favoredDealIds, action.dealId],
          };
        case FavoriteContextActionKind.RemoveFavorite:
          const index = state.favoredDealIds.indexOf(action.dealId);
          if (index === -1) {
            return state;
          }
          return {
            ...state,
            favoredDealIds: [
              ...state.favoredDealIds.slice(0, index),
              ...state.favoredDealIds.slice(index + 1),
            ],
          };
      }
    },
    {
      favoredDealIds: initialFavoredDealIds,
    },
  );

  return (
    <FavoriteContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
