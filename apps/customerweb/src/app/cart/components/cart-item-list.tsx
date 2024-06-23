'use client';

import { CartItem } from '@/app/cart/components/cart-item';
import { useCart } from '@/app/contexts/cart/use-cart';

export function CartItemList() {
  const {
    cartContext: { cart },
  } = useCart();

  return (cart?.items || []).map((cartItem) => (
    <div key={cartItem.dealId} className="border-t border-t-secondary/10">
      <CartItem cartItem={cartItem} />
    </div>
  ));
}
