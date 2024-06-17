import type { ReactNode } from 'react';
import { Session, getServerSession } from 'next-auth';
import { FavoriteContextProvider } from '@/app/contexts/favorite/favorite-context';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface ProvidersProps {
  children: ReactNode;
}
interface FavoriteItem {
  dealId: string;
  createdAt: string;
}

async function getOptionalFavoriteDealIdsFromSession(session: Session | null): Promise<Array<string>> {
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
  const favoriteItems = response.items ?? [];

  // Extract dealId from each item
  const dealIds = favoriteItems.map((item: FavoriteItem) => item.dealId);

  return dealIds;
}

export default async function ServerProviders({ children }: ProvidersProps) {
  const session = await getServerSession(authOptions);
  const favoredDealIds = await getOptionalFavoriteDealIdsFromSession(session);

  return (
    <>
      <FavoriteContextProvider initialFavoredDealIds={favoredDealIds} favsEnabled={!!session}>
        {children}
      </FavoriteContextProvider>
    </>
  );
}
