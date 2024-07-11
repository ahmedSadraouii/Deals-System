'use server';

import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { getAuthApiClient } from '@/utils/auth-api-client';

export interface PasswordForgetRequestActionParams {
  email: string;
}

export async function passwordForgetRequestAction({
  email,
}: PasswordForgetRequestActionParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
}> {
  const authApi = getAuthApiClient();

  try {
    await authApi.forgotPassword({
      forgotPasswordByEmailRequest: {
        email,
      },
    });

    return {
      success: true,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await (error as any).response.json();
      const apiError = tryParseApiErrorWithFallback(errorResponse);
      return {
        success: false,
        apiErrorCode: apiError.errorCode,
        message: apiError.message,
      };
    }
    throw error;
  }
}