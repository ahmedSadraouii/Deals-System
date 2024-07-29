import Link from 'next/link';
import { HonoredDealItem } from './deals/honored-deal-item';
import { getServerSession } from 'next-auth';
import { HeroCarouselMobile } from '@/components/carousel/hero-carousel-mobile';
import { BagSolidIcon } from '@/components/svg/bag-solid-svg';
import { ChevronRightSvg } from '@/components/svg/chevron-right-svg';
import { IconHeart } from '@/components/svg/icon-heart';
import { IconProfile } from '@/components/svg/icon-profile';
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <HeroCarouselMobile title="Deine letzten Deals">
        {activeHonoredDealsList.map((item, index) => (
          <HonoredDealItem
            key={index}
            deal={item.deal}
            supplier={item.supplier}
            honoredDeal={item.honoredDeal}
          />
        ))}
      </HeroCarouselMobile>
      <Link
        href="/profile/general"
        className="flex flex-row items-center justify-between gap-4 rounded-lg bg-neutral-100 p-4 text-secondary lg:rounded-[20px]"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="shrink-0 items-center rounded-full border border-secondary/10 bg-white p-3">
            <IconProfile className="text-xl" />
          </div>
          <div className="flex flex-col leading-snug">
            <h2 className="text-lg font-bold">Persönliche Daten</h2>
          </div>
        </div>
        <ChevronRightSvg className="h-6 w-6 text-secondary" />
      </Link>
      <Link
        href="/profile/deals"
        className="flex flex-row items-center justify-between gap-4 rounded-lg bg-neutral-100 p-4 text-secondary lg:rounded-[20px]"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="shrink-0 items-center rounded-full border border-secondary/10 bg-white p-3">
            <BagSolidIcon className="text-xl" />
          </div>
          <div className="flex flex-col leading-snug">
            <h2 className="text-lg font-bold">Deine Deals</h2>
          </div>
        </div>
        <ChevronRightSvg className="h-6 w-6 text-secondary" />
      </Link>
      <Link
        href="/profile/favorites"
        className="flex flex-row items-center justify-between gap-4 rounded-lg bg-neutral-100 p-4 text-secondary lg:rounded-[20px]"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="shrink-0 items-center rounded-full border border-secondary/10 bg-white p-3">
            <IconHeart className="fill-secondary text-xl" />
          </div>
          <div className="flex flex-col leading-snug">
            <h2 className="text-lg font-bold">Merkliste</h2>
          </div>
        </div>
        <ChevronRightSvg className="h-6 w-6 text-secondary" />
      </Link>
    </div>
  );
}
