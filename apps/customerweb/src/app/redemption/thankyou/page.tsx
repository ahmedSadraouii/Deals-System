import CheckoutCard from '@/components/checkout/checkout-card';
import Celebration from '@/components/checkout/checkout-celebration';
import DealCheckoutCard from '@/components/checkout/checkout-deal-card';
import DiscoverCard from '@/components/discover/discover-card';

export default function Page() {
  // Fake array of items
  const items = [
    {
      id: 2,
      name: 'Deutsche Bahn',
      description: '2 Tickets zum Preis von 12 Tickets zum Preis von 1',
      imageSrc: '/db-img.png',
      imageAlt: 'cart item',
      validDate: 'Gültig ab: 10.05.2024 - Gültig bis: 10.02.2025',
      mainImgUrl: '/train-img.png',
      code: 'GS8S-NVZW-26LO-98LP',
    },
    {
      id: 1,
      name: 'Mud Masters',
      description: 'Mud Masters Arnsberg 2024 (2 Tickets zum Preis von 1)',
      imageSrc: '/img_1.png',
      imageAlt: 'cart item',
      validDate: 'Gültig ab: 10.05.2024 - Gültig bis: 10.02.2025',
      mainImgUrl: '/img.png',
      code: '',
    },
  ];
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
        {items.map((item) => (
          <DealCheckoutCard key={item.id} item={item} />
        ))}
      </div>
      <div className="hidden w-full lg:w-[80%] lg:min-w-[80%] xl:block">
        <DiscoverCard />
      </div>
    </div>
  );
}
