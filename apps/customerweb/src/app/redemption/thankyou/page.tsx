import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import CheckoutCard from '@/components/checkout/checkout-card';
import Celebration from '@/components/checkout/checkout-celebration';
import DealCheckoutCard from '@/components/checkout/checkout-deal-card';
import DiscoverCard from '@/components/discover/discover-card';
import { authOptions } from '@/utils/auth';
import { getHonoredDealsApiClient } from '@/utils/redeem-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }
  const honoredApi = getHonoredDealsApiClient({
    accessToken: session?.accessToken,
  });

  const getHonoredDeals = async (take = 100, skip = 0) => {
    try {
      const honoredDeals = await honoredApi.getHonoredDeals({ take, skip });
      return (
        honoredDeals.items?.filter((deal) => deal.dealId !== undefined) ?? []
      );
    } catch (error) {
      console.error('Error fetching honored deals:', error);
      return [];
    }
  };

  const deals = await getHonoredDeals(100, 0);

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
        {deals.map((deal) => (
          <DealCheckoutCard key={deal.id} deal={deal} />
        ))}
      </div>
      {!session && (
        <div className="hidden w-full lg:w-[80%] lg:min-w-[80%] xl:block">
          <DiscoverCard />
        </div>
      )}
    </div>
  );
}
