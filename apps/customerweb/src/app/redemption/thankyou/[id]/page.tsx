import { getServerSession } from 'next-auth';
import CheckoutCard from '@/components/checkout/checkout-card';
import Celebration from '@/components/checkout/checkout-celebration';
import DealCheckoutCard from '@/components/checkout/checkout-deal-card';
import GuestDealCard from '@/components/checkout/guest-deal-card';
import DiscoverCard from '@/components/discover/discover-card';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { getContentApiClient } from '@/utils/content-api-client';
import { getHonoredDealsApiClient } from '@/utils/deals-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';

type Props = {
  params: { id: string };
};

export default async function Page({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  const honoredDeal = session
    ? await getHonoredDeal(id, session.accessToken)
    : null;
  const guestDeal = !session ? await getGuestDeal(id) : null;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div>
        <Celebration />
      </div>
      <div className="flex w-full flex-col gap-8 md:flex-row lg:w-[80%]">
        <CheckoutCard
          imgUrl="/download-icon.png"
          title="1. Dein Ticket oder Code herunterladen"
          description="Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und Gemeinschaftssinn..."
        />
        <CheckoutCard
          imgUrl="/check-all-icon.png"
          title="2. Deal beim Partner einlösen oder direkt nutzen"
          description="Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und Gemeinschaftssinn..."
        />
        <CheckoutCard
          imgUrl="/smile-icon.png"
          title="3. Spaß haben mit deinem ALDI Deal"
          description="Willkommen zu einem unvergleichlichen Abenteuer voller Nervenkitzel, Ausdauer und Gemeinschaftssinn..."
        />
      </div>
      <div className="flex w-full flex-col gap-8 lg:w-[80%] lg:min-w-[80%]">
        {honoredDeal && (
          <DealCheckoutCard key={honoredDeal.dealId} deal={honoredDeal} />
        )}
        {guestDeal && <GuestDealCard deal={guestDeal} />}
      </div>
      {!session && (
        <div className="hidden w-full lg:w-[80%] lg:min-w-[80%] xl:block">
          <DiscoverCard />
        </div>
      )}
    </div>
  );
}

async function getHonoredDeal(id: string, accessToken: string) {
  const honoredApi = getHonoredDealsApiClient({ accessToken });

  try {
    const honoredDeal = await honoredApi.getHonoredDeal({ id });
    return honoredDeal;
  } catch (error) {
    console.error('Error fetching honored deal:', error);
    return null;
  }
}

async function getGuestDeal(id: string) {
  const contentApi = getContentApiClient();

  try {
    const dealContent = await contentApi.getContentItemById20({ id });
    const fullDeal = dealContent as UmbracoDeal;

    if (!verifyDealIsCorrect(fullDeal)) {
      console.log('Deal is incorrect', fullDeal);
      return null;
    }
    return fullDeal;
  } catch (error) {
    console.error('Error fetching deal content:', error);
    return null;
  }
}
