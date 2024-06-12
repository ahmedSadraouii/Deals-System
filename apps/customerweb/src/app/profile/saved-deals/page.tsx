import React from 'react';
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
    <div
      className={`mb-10 grid min-h-[50vh] gap-10 bg-gray-100   ${deals.length > 0 ? ' grid-cols-1 p-10 md:grid-cols-2 lg:grid-cols-3' : 'grid-col-1'}`}
    >
      {deals.length > 0 ? (
        deals.map((deal, index) => (
          <DealsListItem key={index} deal={deal} display="Grid" />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center  text-3xl font-semibold text-aldi-blue">
          You have no saved deals yet
        </div>
      )}
    </div>
  );
}
