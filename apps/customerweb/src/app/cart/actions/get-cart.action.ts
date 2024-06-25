'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { CartModel } from 'api-deals';
import { ResponseError } from 'api-deals';
import type { EnsureCartRequest } from 'api-deals/generated/apis/CartsApi';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getCartsApiClient } from '@/utils/deals-api-client';

export async function getCartAction(): Promise<{
  cart: CartModel;
}> {
  // session is optional in this case to allow for guest carts, therefore not checking if session is unset
  const session = await getServerSession(authOptions);

  const cookieStore = cookies();
  const existingCartId = cookieStore.get('cart-id');

  if (session) {
    const cartsApi = getCartsApiClient({
      accessToken: session.accessToken,
    });
    const ensureCartRequest: EnsureCartRequest = {};
    if (
      existingCartId?.value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        existingCartId.value,
      )
    ) {
      ensureCartRequest.cartId = existingCartId.value;
    }
    const ensureCartResponse = await cartsApi.ensureCart(ensureCartRequest, {
      cache: 'no-cache',
    });

    // cache bust for client cart page
    revalidatePath('/cart');

    return { cart: ensureCartResponse };
  }

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
      const ensureCartResponse = await cartsApi.ensureCart(
        {
          cartId: existingCartId.value,
        },
        { cache: 'no-cache' },
      );

      // cache bust for client cart page
      revalidatePath('/cart');

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
  const ensureCartResponse = await cartsApi.ensureCart(
    {},
    { cache: 'no-cache' },
  );

  // cache bust for client cart page
  revalidatePath('/cart');

  cookieStore.set('cart-id', ensureCartResponse.cartId!, {
    // expires in 1 hour
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  return { cart: ensureCartResponse };
}
