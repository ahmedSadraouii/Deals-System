import React from 'react';
import type { CardinalDirection } from 'api-user';
import { getServerSession } from 'next-auth';
import type { CheckoutPageAddressFormDefaultValues } from '@/app/(aldi-deals)/cart/checkout/checkout-page';
import { CheckoutPage } from '@/app/(aldi-deals)/cart/checkout/checkout-page';
import { authOptions } from '@/utils/auth';
import { getUserApiClient } from '@/utils/user-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // guest checkout
    return <CheckoutPage />;
  }

  const userApi = getUserApiClient();

  const userDetails = await userApi.getAsync({
    ciamId: session.user.id,
    cardinalDirection: session.user.cardinalDirection as CardinalDirection,
  });

  const defaultFormValues: CheckoutPageAddressFormDefaultValues = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    city: userDetails.addressCity,
    street: userDetails.addressStreet,
    houseNumber: userDetails.addressHouseNumber,
    dateOfBirth: !!userDetails.dateOfBirth
      ? userDetails.dateOfBirth.toISOString()
      : undefined,
    postalCode: userDetails.addressPostalCode,
    email: userDetails.email,
  };

  // no need to make it readonly for the user
  return (
    <CheckoutPage defaultFormValues={defaultFormValues} isReadOnly={false} />
  );
}
