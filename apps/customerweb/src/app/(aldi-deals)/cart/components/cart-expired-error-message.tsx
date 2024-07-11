'use client';

import { CartErrorMessage } from '@/app/(aldi-deals)/cart/components/cart-error-message';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';

export function CartExpiredErrorMessage() {
  const { cartContext } = useCart();
  if (!cartContext || !cartContext.cartExpired) return null;
  return (
    <div className="col-span-full">
      <CartErrorMessage error="cart-expired" />
    </div>
  );
}