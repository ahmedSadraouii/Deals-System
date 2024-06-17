import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { DealsListItem } from '@/components/deal/deals-list-item';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowLeft } from '@/components/svg/icon-arrow-left';
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
      <div className="w-full rounded-large bg-default-100 p-4 lg:p-10">
        {deals.length > 0 && (
          <div className="grid grid-cols-2 gap-8">
            {deals.map((deal, index) => (
              <DealsListItem key={index} deal={deal} display="Grid" />
            ))}
          </div>
        )}
        {deals.length === 0 && (
          <div className="flex flex-col items-center gap-4 text-secondary/50">
            <span>Du hast noch keine Deals gemerkt.</span>

            <AldiButton
              as={Link}
              size="lg"
              variant="ghost"
              href="/"
              startContent={<IconArrowLeft className="text-2xl" />}
              color="secondary"
            >
              Zurück zur Startseite
            </AldiButton>
          </div>
        )}
      </div>
    </div>
  );
}
