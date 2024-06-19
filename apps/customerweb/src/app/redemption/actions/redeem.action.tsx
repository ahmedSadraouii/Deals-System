'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { redeemApiClient } from '@/utils/deals-api-client';

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
  dealId?: string;
}> {
  const session = await getServerSession(authOptions);

  const redeemApi = redeemApiClient({
    accessToken: session?.accessToken,
  });

  try {
    const response = await redeemApi.redeemVoucher({
      redeemInputModel: { pin, email },
    });

    const { dealId } = response;

    revalidatePath('/redemption/thankyou');
    return {
      success: true,
      dealId,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await error.response.json();
      if (errorResponse.errors && errorResponse.errors.pin) {
        return {
          success: false,
          message: errorResponse.errors.pin.join(', '), // Join multiple error messages if any
        };
      }
    }
    throw error;
  }
}
