'use server';

import type { AuthenticationApi } from 'api-auth';
import { ApiError } from '@/utils/api-error';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
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

  try {
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
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await (error as any).response.json();
      const apiError = tryParseApiErrorWithFallback(errorResponse);
      throw new ApiError(
        `Found API errorCode: ${apiError.errorCode}, message: ${apiError.message}`,
        error,
      );
    }
    throw error;
  }
}
