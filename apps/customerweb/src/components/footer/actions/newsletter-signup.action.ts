'use server';

import { getAuthApiClient } from '@/utils/auth-api-client';

export interface NewsletterSignupActionParams {
  firstName: string;
  lastName: string;
  email: string;
}

export async function newsletterSignup({
  firstName,
  lastName,
  email,
}: NewsletterSignupActionParams): Promise<{
  success: boolean;
}> {
  const authApi = getAuthApiClient({});
  await authApi.authenticationSubscribeNewsletter({
    subscribeNewsletterRequest: {
      firstName,
      lastName,
      email,
    },
  });
  return {
    success: true,
  };
}
