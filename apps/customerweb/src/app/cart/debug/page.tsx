'use client';

import { useCart } from '@/app/contexts/cart/use-cart';

export default function Page() {
  const { cartContext } = useCart();

  if (!cartContext.cart) {
    return null;
  }

  return (
    <pre className="whitespace-pre-wrap bg-default-100 p-4">
      {JSON.stringify(cartContext.cart, null, 2)}
    </pre>
  );
}
