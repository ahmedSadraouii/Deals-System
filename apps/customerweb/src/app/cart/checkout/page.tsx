import React from 'react';
import type { CheckoutPageAddressForm } from '@/app/cart/checkout/checkout-page';
import { CheckoutPage } from '@/app/cart/checkout/checkout-page';

export default async function Page() {
  const defaultFormValues: CheckoutPageAddressForm = {};

  // @Russlan
  // todo: if we are logged in, get the profile information and set it as defaultFormValues
  // todo: in the CheckoutPage component, make the form fields readonly if they are already filled in with defaultFormValues

  return <CheckoutPage defaultFormValues={defaultFormValues} />;
}
