'use client';

import { createContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { CartModel } from 'api-deals';
import { EnsureCart } from '@/app/contexts/cart/ensure-cart';

export enum CartContextActionKind {
  UpdateCart = 'updateCart',
  ExpireCart = 'expireCart',
}

export type CartContextAction =
  | {
      type: CartContextActionKind.UpdateCart;
      cart: CartModel;
    }
  | {
      type: CartContextActionKind.ExpireCart;
    };

export interface CartContextState {
  cart?: CartModel;
}

export interface CartContextInterface extends CartContextState {
  dispatch: Dispatch<CartContextAction>;
}

export const CartContext = createContext<CartContextInterface>({
  cart: undefined,
  dispatch: () => {
    throw new Error('CartContext not initialized');
  },
});

interface CartContextProviderProps {
  children: ReactNode;
  initialCart?: CartModel;
}

export function CartContextProvider({
  children,
  initialCart,
}: CartContextProviderProps) {
  const [state, dispatch] = useReducer(
    (_state: CartContextState, action: CartContextAction) => {
      switch (action.type) {
        case CartContextActionKind.UpdateCart:
          return {
            cart: action.cart,
          } as CartContextState;
        case CartContextActionKind.ExpireCart:
          return {
            cart: undefined,
          } as CartContextState;
      }
    },
    {
      cart: initialCart,
    } as CartContextState,
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      <EnsureCart />
      {children}
    </CartContext.Provider>
  );
}
