import { cookies } from 'next/headers';
import type { CartModel } from 'api-deals';
import { ResponseError } from 'api-deals';
import type { EnsureCartRequest } from 'api-deals/generated/apis/CartsApi';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getCartsApiClient } from '@/utils/deals-api-client';

export async function getServerCart(): Promise<CartModel> {
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

    return await cartsApi.ensureCart(ensureCartRequest, {
      cache: 'no-cache',
    });
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
      return await cartsApi.ensureCart(
        {
          cartId: existingCartId.value,
        },
        {
          cache: 'no-cache',
        },
      );
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

  return await cartsApi.ensureCart(
    {},
    {
      cache: 'no-cache',
    },
  );
}
