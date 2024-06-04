'use server';

import type { AuthenticationApi } from 'api-auth';
import { getApiClient } from '@/utils/get-api-client';

export interface ResendVerificationEmailActionParams {
  emailAddress: string;
}

export async function resendVerificationEmailAction({
  emailAddress,
}: ResendVerificationEmailActionParams): Promise<void> {
  const authApi = getApiClient<AuthenticationApi>({ type: 'auth' });

  await authApi.resendEmailVerificationAsync({
    resendVerificationEmailRequest: {
      email: emailAddress,
    },
  });
}
