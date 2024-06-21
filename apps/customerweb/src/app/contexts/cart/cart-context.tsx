'use client';

import { createContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { OrderModel } from 'api-deals';
import { EnsureCart } from '@/app/contexts/cart/ensure-cart';

export enum CartContextActionKind {
  UpdateCart = 'updateCart',
}

export type CartContextAction = {
  type: CartContextActionKind.UpdateCart;
  cart: OrderModel;
};

export interface CartContextState {
  cart?: OrderModel;
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
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [state, dispatch] = useReducer(
    (state: CartContextState, action: CartContextAction) => {
      switch (action.type) {
        case CartContextActionKind.UpdateCart:
          return {
            ...state,
            cart: action.cart,
          } as CartContextState;
      }
    },
    {
      cart: undefined,
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
