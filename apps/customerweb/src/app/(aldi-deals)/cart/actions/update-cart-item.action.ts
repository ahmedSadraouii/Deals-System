'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { CartModel } from 'api-deals';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getCartsApiClient } from '@/utils/deals-api-client';

export interface UpdateCartItemActionParams {
  dealId: string;
  quantity: number;
}

export async function updateCartItemAction({
  dealId,
  quantity,
}: UpdateCartItemActionParams): Promise<{
  cart: CartModel;
}> {
  const session = await getServerSession(authOptions);

  const cartsApi = getCartsApiClient({
    accessToken: session?.accessToken,
  });

  if (session) {
    const cart = await cartsApi.updateCartItem({
      updateCartItem: {
        dealId,
        quantity,
      },
    });

    // cache bust for client cart page
    revalidatePath('/cart');

    return {
      cart: cart,
    };
  }

  const cookieStore = cookies();

  const existingCartId = cookieStore.get('cart-id');

  // make sure the cartId is actually uuid format
  if (
    !existingCartId?.value ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      existingCartId.value,
    )
  ) {
    cookieStore.delete('cart-id');
    throw new Error('Invalid cart ID');
  }
  const cart = await cartsApi.updateCartItem({
    cartId: existingCartId.value,
    updateCartItem: {
      dealId,
      quantity,
    },
  });

  // cache bust for client cart page
  revalidatePath('/cart');

  return {
    cart: cart,
  };
}