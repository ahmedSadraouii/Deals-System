'use server';

import type { AuthenticationApi } from 'api-auth';
import { inspect } from 'util';
import { getApiClient } from '@/utils/get-api-client';

export interface ResetPasswordActionParams {
  code: string;
  newPassword: string;
}

export async function resetPasswordAction({
  code,
  newPassword,
}: ResetPasswordActionParams): Promise<{ error?: string }> {
  const authApi = getApiClient<AuthenticationApi>({ type: 'auth' });
  console.log('Trying to reset password', code, newPassword);
  try {
    const result = await authApi.updateUserPassword({
      code,
      changePasswordRequest: {
        newPassword,
      },
    });
    console.log(inspect(result, false, 3, true));
    return {};
  } catch (error) {
    console.error(error);
    throw new Error('SHESH');
    return {
      error: 'sheesh',
    };
  }
}
