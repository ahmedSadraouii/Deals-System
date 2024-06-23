'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { CartModel } from 'api-deals';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getCartsApiClient } from '@/utils/deals-api-client';

export interface RemoveCartItemActionParams {
  dealId: string;
}

export async function removeCartItemAction({
  dealId,
}: RemoveCartItemActionParams): Promise<{
  cart: CartModel;
}> {
  const cookieStore = cookies();
  const session = await getServerSession(authOptions);

  const existingCartId = cookieStore.get('cart-id');

  // make sure the cartId is actually uuid format
  if (
    !existingCartId?.value ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      existingCartId.value,
    )
  ) {
    throw new Error('Invalid cart ID');
  }

  const cartsApi = getCartsApiClient({
    accessToken: session?.accessToken,
  });

  const cart = await cartsApi.deleteCartItem({
    cartId: existingCartId.value,
    dealId,
  });

  // cache bust for client cart page
  revalidatePath('/cart');

  return {
    cart: cart,
  };
}
