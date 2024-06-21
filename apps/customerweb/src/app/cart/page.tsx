'use client';

import { CartStepIndicator } from '@/app/cart/components/cart-step-indicator';
import { useCart } from '@/app/contexts/cart/use-cart';

export default function Page() {
  const { cartContext, updateCartItem, removeCartItem } = useCart();

  if (!cartContext.cart) {
    return null;
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <CartStepIndicator step={3} />
      </div>
      Pisse
      <pre className="whitespace-pre-wrap bg-default-100 p-4">
        {JSON.stringify(cartContext.cart, null, 2)}
      </pre>
    </div>
  );
}
