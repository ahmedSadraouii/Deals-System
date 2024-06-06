'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface DeleteFavoriteActionParams {
  dealId: string;
}

export async function deleteFavoriteAction({
  dealId,
}: DeleteFavoriteActionParams): Promise<{
  success: boolean;
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

    return {
      success: true,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await (error as any).response.json();
      return {
        success: false,
        message:
          errorResponse.message ||
          'An error occurred while deleting the favorite',
      };
    }
    throw error;
  }
}
