import React from 'react';
import { getServerSession } from 'next-auth';
import { HonoredDealsList } from '@/app/(aldi-deals)/profile/deals/honored-deals-list';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { getContentApiClient } from '@/utils/content-api-client';
import { getHonoredDealsApiClient } from '@/utils/deals-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const contentApi = getContentApiClient();
  const honoredDealsApi = getHonoredDealsApiClient({
    accessToken: session?.accessToken,
  });

  const dealsResponse = await contentApi.getContent20({
    filter: ['contentType:deal'], // TODO: dont do that, pull children from item at /content/deals
    take: 100,
  });
  const deals = (dealsResponse.items as Array<UmbracoDeal>).filter((deal) =>
    verifyDealIsCorrect(deal),
  );

  if (deals.length !== dealsResponse.items.length) {
    console.error(
      'Some deals returned from then content API are incorrect. Skipping them.',
    );
  }

  const uniqueSupplierIds = Array.from(
    new Set(deals.map((deal) => deal.properties?.supplier!.id!)),
  );

  const suppliers = await Promise.all(
    uniqueSupplierIds.map(
      (id) =>
        contentApi.getContentItemById20({
          id,
        }) as Promise<UmbracoSupplier>,
    ),
  );

  const filteredSuppliers = suppliers.filter((supplier) =>
    verifySupplierIsCorrect(supplier),
  );

  if (filteredSuppliers.length !== suppliers.length) {
    console.error(
      'Some suppliers returned from the content API are incorrect. Skipping them.',
    );
  }

  const honoredDealsResponse = await honoredDealsApi.getHonoredDeals();
  const honoredDealsList = honoredDealsResponse.items || [];

  const dealsItems = honoredDealsList
    .map((honoredDeal) => {
      const deal = deals.find((deal) => deal.id === honoredDeal.dealId);
      if (!deal) {
        console.error(
          `Deal with id ${honoredDeal.dealId} was not found in the list of all deals.`,
        );
      }

      // todo: SUPER HACKY TEMPORARY WORKAROUND, REMOVE THIS IMMEDIATELY
      // use the first deal if the deal was not found
      const dealToUse = deal; // || deals[0];
      //if (dealToUse !== deal) {
      //  console.error(
      //    `Using deal ${dealToUse?.id} instead of ${deal?.id}`,
      // );
      // }

      const supplier = suppliers.find(
        (supplier) => supplier.id === dealToUse?.properties?.supplier?.id,
      );
      if (!supplier) {
        console.error(
          `Supplier with id ${dealToUse?.properties?.supplier?.id} was not found in the list of all suppliers.`,
        );
      }
      return {
        honoredDeal,
        deal: dealToUse!,
        supplier: supplier!,
      };
    })
    .filter(({ deal }) => deal !== undefined)
    .filter(({ supplier }) => supplier !== undefined);

  if (dealsItems.length !== honoredDealsList.length) {
    console.error(
      'Some honored deals could not be found in the list of all deals or their supplier was missing. Missing deals or suppliers from content API?',
    );
  }

  const activeHonoredDealsList = dealsItems.filter(({ deal }) => {
    if (!deal.properties?.promotionEnd) return false;
    // parse the date
    const promotionEnd = new Date(Date.parse(deal.properties.promotionEnd));
    // check if dealReference.promotionEnd is in the future
    return promotionEnd > new Date();
  });

  const expiredHonoredDealsList = dealsItems.filter((orderItem) => {
    // everything else
    return !activeHonoredDealsList.includes(orderItem);
  });

  return (
    <div className="mx-auto mb-40 flex w-full flex-col items-center px-4 lg:max-w-5xl">
      <div className="w-full rounded-large bg-default-100 p-4 lg:p-10">
        <h1 className="mb-6 text-3xl font-bold text-secondary">
          Deine erworbenen Deals
        </h1>
        <HonoredDealsList items={activeHonoredDealsList} />
        {activeHonoredDealsList.length === 0 && (
          <p className="mt-4 text-secondary/50">
            Du hast noch keine Deals erworben.
          </p>
        )}
        {expiredHonoredDealsList.length > 0 && (
          <>
            <h1 className="mb-6 pt-4 text-3xl font-bold text-secondary lg:pt-10">
              Ältere Deals
            </h1>
            <HonoredDealsList items={expiredHonoredDealsList} />
          </>
        )}
      </div>
    </div>
  );
}
