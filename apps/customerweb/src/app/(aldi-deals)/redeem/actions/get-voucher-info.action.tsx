'use server';

import { getServerSession } from 'next-auth';
import { ApiError } from '@/utils/api-error';
import { ApiErrorCodes } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { getVoucherApiClient } from '@/utils/deals-api-client';

export interface GetVoucherInfoParams {
  pin: string;
}

export interface GetVoucherInfoResult {
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
  dealId?: string | null;
  state?: string;
}

export async function getVoucherInfo({
  pin,
}: GetVoucherInfoParams): Promise<GetVoucherInfoResult> {
  const session = await getServerSession(authOptions);

  const voucherApi = getVoucherApiClient({
    accessToken: session?.accessToken,
  });

  try {
    const response = await voucherApi.getVoucherInfo({
      pin: pin,
    });

    const { dealId, state } = response;

    return {
      success: true,
      dealId,
      state,
    };
  } catch (error: any) {
    if (error instanceof ApiError && error.context?.response?.status === 404) {
      return {
        success: false,
        apiErrorCode: ApiErrorCodes.VOUCHER_NOT_FOUND,
      };
    } else if (
      error instanceof ApiError &&
      error.context?.response?.status === 400
    ) {
      return {
        success: false,
        apiErrorCode: ApiErrorCodes.VOUCHER_VALIDATION_FAILED,
      };
    }

    throw error;
  }
}
