'use server';

import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { getAuthApiClient } from '@/utils/get-auth-api-client';

export interface RegistrationCompletionActionParams {
  email: string;
  password: string;
  termsAccepted: boolean;
  newsletterAccepted: boolean;
}

export async function registrationCompletionAction({
  email,
  password,
  termsAccepted,
  newsletterAccepted,
}: RegistrationCompletionActionParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
}> {
  const authApi = getAuthApiClient();

  try {
    await authApi.registerOnDealsAsync({
      dealsRegistrationRequest: {
        email,
        password,
        termsAccepted,
        newsletterAccepted,
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
