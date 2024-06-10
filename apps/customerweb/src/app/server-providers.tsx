import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { FavoriteContextProvider } from '@/app/contexts/favorite/favorite-context';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface ProvidersProps {
  children: ReactNode;
}

async function getOptionalFavoriteDealIdsFromSession(): Promise<Array<string>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return [];
  }

  const favoritesApi = getFavoritesApiClient({
    accessToken: session.accessToken,
  });

  const response = await favoritesApi
    .getUserFavorites({
      take: 1000,
      skip: 0,
    })
    .catch(catchApiError);

  // Ensure that favorites is an empty array if it is null or undefined
  return response.items ?? [];
}

export default async function ServerProviders({ children }: ProvidersProps) {
  const favoredDealIds = await getOptionalFavoriteDealIdsFromSession();

  return (
    <FavoriteContextProvider initialFavoredDealIds={favoredDealIds}>
      {children}
    </FavoriteContextProvider>
  );
}
