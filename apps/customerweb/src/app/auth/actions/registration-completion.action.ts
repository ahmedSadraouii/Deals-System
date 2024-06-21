'use server';

import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { getAuthApiClient } from '@/utils/auth-api-client';

export interface RegistrationCompletionActionParams {
  email: string;
  password: string;
  newsletterAccepted: boolean;
}

export async function registrationCompletionAction({
  email,
  password,
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
        termsAccepted: true,
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
