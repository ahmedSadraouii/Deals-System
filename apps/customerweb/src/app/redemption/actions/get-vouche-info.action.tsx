'use server';

import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { redeemApiClient } from '@/utils/deals-api-client';

export interface getVoucherInfoParams {
  pin: string;
}

export async function getVoucherInfo({ pin }: getVoucherInfoParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
  dealId?: string | null;
  state?: string;
}> {
  const session = await getServerSession(authOptions);

  const redeemApi = redeemApiClient({
    accessToken: session?.accessToken,
  });

  try {
    const response = await redeemApi.getVoucherInfo({
      pin: pin,
    });

    const { dealId, state } = response;

    return {
      success: true,
      dealId,
      state,
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
