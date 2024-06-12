'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface DeleteFavoriteActionParams {
  dealId: string;
}

export async function deleteFavoriteAction({
  dealId,
}: DeleteFavoriteActionParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
}> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('User is not authenticated');
  }

  const favoritesApi = getFavoritesApiClient({
    accessToken: session.accessToken,
  });

  try {
    await favoritesApi.deleteUserFavorite({
      dealId,
      xApiVersion: '1.0',
    });
    revalidatePath('/saved-deals');
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