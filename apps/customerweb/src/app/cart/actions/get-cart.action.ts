'use server';

import { cookies } from 'next/headers';
import type { OrderModel } from 'api-deals';
import { ResponseError } from 'api-deals';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getCartsApiClient } from '@/utils/deals-api-client';

export async function getCartAction(): Promise<{
  cart: OrderModel;
}> {
  // session is optional in this case to allow for guest carts, therefore not checking if session is unset
  const session = await getServerSession(authOptions);

  if (session) {
    const cartsApi = getCartsApiClient({
      accessToken: session.accessToken,
    });
    const ensureCartResponse = await cartsApi.ensureCart();
    return { cart: ensureCartResponse };
  }

  const cookieStore = cookies();
  const existingCartId = cookieStore.get('cart-id');

  const cartsApi = getCartsApiClient({});

  // make sure the cartId is actually uuid format
  if (
    existingCartId?.value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      existingCartId.value,
    )
  ) {
    // retrieving the same cart id from cookies
    try {
      const ensureCartResponse = await cartsApi.ensureCart({
        cartId: existingCartId.value,
      });

      cookieStore.set('cart-id', ensureCartResponse.cartId!, {
        // expires in 1 hour
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      return { cart: ensureCartResponse };
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status !== 404) {
          // 404 is allowed, therefore throw unless its a 404
          // this ensures that we continue with creating a new cart
          throw error;
        }
      }
    }
  }

  // create a new anonymous cart

  const ensureCartResponse = await cartsApi.ensureCart();

  cookieStore.set('cart-id', ensureCartResponse.cartId!, {
    // expires in 1 hour
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  return { cart: ensureCartResponse };
}
