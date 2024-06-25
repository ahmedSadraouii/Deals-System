'use server';

import { cookies } from 'next/headers';
import type { CheckoutInputModel, CreateCheckoutRequest } from 'api-deals';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import type { AdBeApiClientProps } from '@/utils/deals-api-client';
import { getCartsApiClient } from '@/utils/deals-api-client';

export interface CartCheckoutActionParams
  extends Omit<CheckoutInputModel, 'dateOfBirth'> {
  dateOfBirth: string;
}

export async function cartCheckoutAction({
  email,
  firstName,
  lastName,
  dateOfBirth,
  street,
  houseNumber,
  postalCode,
  city,
}: CartCheckoutActionParams): Promise<{
  redirectUrl: string;
}> {
  // session is optional in this case to allow for guest carts, therefore not checking if session is unset
  const session = await getServerSession(authOptions);

  const cookieStore = cookies();
  const existingCartId = cookieStore.get('cart-id');

  const cartsApiProps: AdBeApiClientProps = {};
  if (session) {
    cartsApiProps.accessToken = session.accessToken;
  }
  const cartsApi = getCartsApiClient(cartsApiProps);

  const createCheckoutRequest: CreateCheckoutRequest = {
    checkoutInputModel: {
      email,
      firstName,
      lastName,
      dateOfBirth: new Date(Date.parse(dateOfBirth)),
      street,
      houseNumber,
      postalCode,
      city,
      countryCode: 'DE',
    },
    returnUrl: 'http://localhost:4420/cart/success',
  };

  if (
    existingCartId?.value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      existingCartId.value,
    )
  ) {
    createCheckoutRequest.cartId = existingCartId.value;
  }

  const createCheckoutResponse = await cartsApi.createCheckout(
    createCheckoutRequest,
  );

  console.log('Got Response', createCheckoutResponse);

  return {
    redirectUrl: createCheckoutResponse.redirectUrl || '',
  };
}
