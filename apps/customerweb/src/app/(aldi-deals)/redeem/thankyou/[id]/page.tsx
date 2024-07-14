import { getServerSession } from 'next-auth';
import CheckoutCard from '@/components/checkout/checkout-card';
import Celebration from '@/components/checkout/checkout-celebration';
import DealCheckoutCard from '@/components/checkout/checkout-deal-card';
import GuestDealCard from '@/components/checkout/guest-deal-card';
import DiscoverCard from '@/components/discover/discover-card';
import { RedemptionSteps } from '@/components/redeem/redemption-steps';
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
  console.log('token', session?.accessToken);

  const honoredDeal = session
    ? await getHonoredDeal(id, session?.accessToken)
    : null;
  const guestDeal = !session ? await getGuestDeal(id) : null;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <RedemptionSteps />
      </div>
      <div className="py:4 container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:gap-16 md:px-0 md:py-14">
        <div>
          <Celebration />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8 lg:w-[80%]">
          <CheckoutCard
            imgUrl="/img-discount.png"
            title="1. Rabattcode deines DEALS kopieren"
            description="Kopiere deinen Rabattcode aus der unteren Übersicht oder aus der Bestellbestätigungs-E-Mail, die du erhalten hast."
          />
          <CheckoutCard
            imgUrl="/img-globe.png"
            title="2. Webseite des Deal-Partners besuchen "
            description="Besuche die Webseite des Deal-Partners durch Klicken des Buttons aus der unteren Übersicht oder aus der Bestellbestätigungs-E-Mail."
          />
          <CheckoutCard
            imgUrl="/img-coupon.png"
            title="3. Deinen Rabattcode anwenden und sparen"
            description="Wähle ein Produkt auf der Webseite des Deal-Partners aus und wende deinen Rabattcode im Bestellvorgang an. Viel Spaß beim Sparen!"
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
    </div>
  );
}

async function getHonoredDeal(id: string, accessToken: string) {
  const honoredApi = getHonoredDealsApiClient({ accessToken });

  try {
    const honoredDeal = await honoredApi.getHonoredDeal({ id: id });
    return honoredDeal;
  } catch (error) {
    console.error('Error fetching honored deal:', error);
    return null;
  }
}

async function getGuestDeal(id: string) {
  const contentApi = getContentApiClient();

  try {
    const dealContent = await contentApi.getContentItemById20({ id: id });
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
