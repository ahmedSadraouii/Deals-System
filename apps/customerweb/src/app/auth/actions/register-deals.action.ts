'use server';

import type { AuthenticationApi } from 'api-auth';
import { getApiClient } from '@/utils/get-api-client';

export interface RegisterDealsActionParams {
  email: string;
  firstName: string;
  lastName: string;
  addressPostalCode: string;
  password: string;
  termsAccepted: boolean;
  newsletterAccepted: boolean;
}

export async function registerDealsAction({
  email,
  firstName,
  lastName,
  addressPostalCode,
  password,
  termsAccepted,
  newsletterAccepted,
}: RegisterDealsActionParams): Promise<void> {
  const authApi = getApiClient<AuthenticationApi>({ ssr: true, type: 'auth' });

  await authApi.registerCustomerEmail({
    registerCustomerByEmailRequest: {
      email,
      firstName,
      lastName,
      addressPostalCode,
      password,
      termsAccepted,
      newsletterAccepted,
    },
  });

  await authApi.registerOnDealsAsync();
}
