'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { getVoucherApiClient } from '@/utils/deals-api-client';

export interface RedeemVoucherParams {
  pin: string;
  email?: string;
}

export async function redeemVoucher({
  pin,
  email,
}: RedeemVoucherParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
  dealId?: string;
  honoredDealId?: string;
}> {
  const session = await getServerSession(authOptions);

  const voucherApi = getVoucherApiClient({
    accessToken: session?.accessToken,
  });

  try {
    const response = await voucherApi.redeemVoucher({
      redeemVoucherInputModel: { pin, email },
    });

    const { dealId, honoredDealId } = response;

    revalidatePath('/redeem/thankyou');
    return {
      success: true,
      dealId,
      honoredDealId,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await error.response.json();
      if (errorResponse.errors && errorResponse.errors.pin) {
        return {
          success: false,
          message: errorResponse.errors.pin.join(', '),
        };
      }
    }
    throw error;
  }
}
