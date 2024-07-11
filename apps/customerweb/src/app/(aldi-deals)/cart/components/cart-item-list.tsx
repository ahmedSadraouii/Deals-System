'use client';

import { CartItem } from '@/app/(aldi-deals)/cart/components/cart-item';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';

export interface CartItemListProps {
  editable?: boolean;
  isCheckoutPage: boolean;
}
export function CartItemList({
  editable = true,
  isCheckoutPage,
}: CartItemListProps) {
  const {
    cartContext: { cart },
  } = useCart();

  return (cart?.items || []).map((cartItem) => (
    <div key={cartItem.dealId} className="md:border-t md:border-t-secondary/10">
      <CartItem
        cartItem={cartItem}
        editable={editable}
        isCheckoutPage={isCheckoutPage}
      />
    </div>
  ));
}
