'use server';

import { inspect } from 'util';
import { getAuthApiClient } from '@/utils/auth-api-client';

export interface ResetPasswordActionParams {
  code: string;
  newPassword: string;
}

export async function resetPasswordAction({
  code,
  newPassword,
}: ResetPasswordActionParams): Promise<{ error?: string }> {
  const authApi = getAuthApiClient();
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
