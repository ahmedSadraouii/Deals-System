'use server';

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
  try {
    const result = await authApi.updateUserPassword({
      code,
      changePasswordRequest: {
        newPassword,
      },
    });
    return {};
  } catch (error) {
    console.error(error);
    throw new Error('reset password action caused an error');
    return {
      error: 'reset password action caused an error',
    };
  }
}
