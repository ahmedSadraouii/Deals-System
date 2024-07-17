import React from 'react';
import { EmptyFavoriteList } from './empty-favorite-list';
import { FavoriteList } from './favorite-list';
import { getServerSession } from 'next-auth';
import { DealsListItem } from '@/components/deal/deals-list-item';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { getContentApiClient } from '@/utils/content-api-client';
import { getFavoritesApiClient } from '@/utils/deals-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const favoritesApi = getFavoritesApiClient({
    accessToken: session?.accessToken,
  });
  const contentApi = getContentApiClient();

  async function getDeals(take: number = 100, skip: number = 0) {
    const favorites = await favoritesApi.getUserFavorites({ take, skip });

    if (favorites.items && favorites.items.length > 0) {
      const dealIds = new Set(
        favorites.items
          .map((item) => item.dealId)
          .filter((id): id is string => id !== undefined),
      );
      return (await contentApi.getContentItem({
        id: dealIds,
      })) as UmbracoDeal[];
    }
    return [];
  }
  const deals = await getDeals(100, 0);

  return (
    <div className="mx-auto mb-40 flex w-full flex-col items-center px-4 lg:max-w-5xl">
      <div className="w-full rounded-large bg-default-100 p-4 lg:p-14">
        {deals.length > 0 ? (
          <FavoriteList>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {deals.map((deal) => (
                <DealsListItem deal={deal} display="Grid" key={deal.id} />
              ))}
            </div>
          </FavoriteList>
        ) : (
          <EmptyFavoriteList />
        )}
      </div>
    </div>
  );
}
