'use server';

import { cookies } from 'next/headers';
import type { OrderModel } from 'api-deals';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getCartsApiClient } from '@/utils/deals-api-client';

export interface UpdateCartItemActionParams {
  dealId: string;
  quantity: number;
}

export async function updateCartItemAction({
  dealId,
  quantity,
}: UpdateCartItemActionParams): Promise<{
  cart: OrderModel;
}> {
  const session = await getServerSession(authOptions);

  const cartsApi = getCartsApiClient({
    accessToken: session?.accessToken,
  });

  if (session) {
    console.log(session.accessToken);
    console.log('Updating cart', {
      dealId,
      quantity,
    });
    const cart: OrderModel = await cartsApi
      .updateCartItem({
        updateCartItem: {
          dealId,
          quantity,
        },
      })
      .catch(catchApiError);

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
  console.log('Updating cart', {
    cartId: existingCartId.value,
    dealId,
    quantity,
  });
  const cart: OrderModel = await cartsApi
    .updateCartItem({
      cartId: existingCartId.value,
      updateCartItem: {
        dealId,
        quantity,
      },
    })
    .catch(catchApiError);

  return {
    cart: cart,
  };
}
