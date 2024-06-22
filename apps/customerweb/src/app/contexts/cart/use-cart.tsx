'use client';

import { useCallback, useContext, useEffect } from 'react';
import { getCartAction } from '@/app/cart/actions/get-cart.action';
import { removeCartItemAction } from '@/app/cart/actions/remove-cart-item.action';
import { updateCartItemAction } from '@/app/cart/actions/update-cart-item.action';
import type { CartContextInterface } from '@/app/contexts/cart/cart-context';
import {
  CartContext,
  CartContextActionKind,
} from '@/app/contexts/cart/cart-context';

export function useCart(): {
  cartContext: CartContextInterface;
  updateCartItem: (dealId: string, quantity: number) => Promise<void>;
  removeCartItem: (dealId: string) => Promise<void>;
} {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  const ensureCart = useCallback(async () => {
    if (cartContext.cart) {
      return cartContext.cart;
    }

    const getCartResponse = await getCartAction();
    cartContext.dispatch({
      type: CartContextActionKind.UpdateCart,
      cart: getCartResponse.cart,
    });

    return getCartResponse.cart;
  }, [cartContext]);

  const updateCartItem = useCallback(
    async (dealId: string, quantity: number) => {
      const addCartItemResponse = await updateCartItemAction({
        dealId,
        quantity,
      });
      cartContext.dispatch({
        type: CartContextActionKind.UpdateCart,
        cart: addCartItemResponse.cart,
      });
    },
    [cartContext],
  );

  const removeCartItem = useCallback(
    async (dealId: string) => {
      const removeCartItemResponse = await removeCartItemAction({
        dealId,
      });
      cartContext.dispatch({
        type: CartContextActionKind.UpdateCart,
        cart: removeCartItemResponse.cart,
      });
    },
    [cartContext],
  );

  useEffect(() => {
    (async function () {
      await ensureCart();
    })();
  }, [ensureCart]);

  return {
    cartContext,
    updateCartItem,
    removeCartItem,
  };
}
