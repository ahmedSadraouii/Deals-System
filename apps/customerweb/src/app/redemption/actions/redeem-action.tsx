'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { redeemApiClient } from '@/utils/redeem-api-client';

export interface addHonoredDealParams {
  pin: string;
  email: string;
}

export async function addHonoredDeal({
  pin,
  email,
}: addHonoredDealParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
}> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('User is not authenticated');
  }

  const honoredApi = redeemApiClient({
    accessToken: session.accessToken,
  });

  try {
    await honoredApi.redeem({
      xApiVersion: '1.0',
      redeemInputModel: { pin, email },
    });
    revalidatePath('/redemption/thankyou');
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
