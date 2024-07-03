'use client';

import { CartItem } from '@/app/cart/components/cart-item';
import { useCart } from '@/app/contexts/cart/use-cart';

export interface CartItemListProps {
  editable?: boolean;
}
export function CartItemList({ editable = true }: CartItemListProps) {
  const {
    cartContext: { cart },
  } = useCart();

  return (cart?.items || []).map((cartItem) => (
    <div key={cartItem.dealId} className="md:border-t md:border-t-secondary/10">
      <CartItem cartItem={cartItem} editable={editable} />
    </div>
  ));
}
