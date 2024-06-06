'use server';

import { getAuthApiClient } from '@/utils/get-auth-api-client';

export interface ResendVerificationEmailActionParams {
  emailAddress: string;
}

export async function resendVerificationEmailAction({
  emailAddress,
}: ResendVerificationEmailActionParams): Promise<void> {
  const authApi = getAuthApiClient();

  await authApi.resendEmailVerificationAsync({
    resendVerificationEmailRequest: {
      email: emailAddress,
    },
  });
}
