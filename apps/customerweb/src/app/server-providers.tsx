import type { ReactNode } from 'react';
import type { FavoriteModel } from 'api-deals';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { getServerCart } from '@/app/cart/get-server-cart';
import { CartContextProvider } from '@/app/contexts/cart/cart-context';
import { FavoriteContextProvider } from '@/app/contexts/favorite/favorite-context';
import { authOptions } from '@/utils/auth';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export interface ProvidersProps {
  children: ReactNode;
}

async function getOptionalFavoriteDealIdsFromSession(
  session: Session | null,
): Promise<Array<string>> {
  if (!session) {
    return [];
  }

  const favoritesApi = getFavoritesApiClient({
    accessToken: session.accessToken,
  });

  const response = await favoritesApi.getUserFavorites({
    take: 1000,
    skip: 0,
  });

  // Ensure that favorites is an empty array if it is null or undefined
  const favoriteItems = response.items ?? [];

  // Extract dealId from each item
  return favoriteItems
    .map((item: FavoriteModel) => item.dealId)
    .filter((dealId) => dealId !== undefined) as Array<string>;
}

export default async function ServerProviders({ children }: ProvidersProps) {
  const session = await getServerSession(authOptions);
  const favoredDealIds = await getOptionalFavoriteDealIdsFromSession(session);
  const cart = await getServerCart();

  return (
    <>
      <FavoriteContextProvider
        initialFavoredDealIds={favoredDealIds}
        favsEnabled={!!session}
      >
        <CartContextProvider initialCart={cart}>{children}</CartContextProvider>
      </FavoriteContextProvider>
    </>
  );
}
