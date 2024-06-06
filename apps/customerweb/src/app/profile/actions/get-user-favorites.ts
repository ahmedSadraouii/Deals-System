'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface GetFavoritesActionParams {
  take?: number;
  skip?: number;
}

export async function getFavoritesAction({
  take = 10,
  skip = 0,
}: GetFavoritesActionParams): Promise<{
  success: boolean;
  favorites?: any[];
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
    const response = await favoritesApi.getUserFavorites({
      take,
      skip,
      xApiVersion: '1.0',
    });

    // Ensure that favorites is an empty array if it is null or undefined
    const favorites = response.items ?? [];

    return {
      success: true,
      favorites,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await (error as any).response.json();
      return {
        success: false,
        message:
          errorResponse.message ||
          'An error occurred while fetching the favorites',
      };
    }
    throw error;
  }
}
