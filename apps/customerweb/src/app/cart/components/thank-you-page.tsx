import Image from 'next/image';
import type { OrderModel } from 'api-deals';
import { CheckoutOrderItem } from '@/app/cart/components/checkout-order-item';
import { Refresh } from '@/app/cart/components/refresh';
import CheckoutCard from '@/components/checkout/checkout-card';
import { LoadingSvg } from '@/components/svg/loading-svg';

export interface ThankYouPageProps {
  orderModel?: OrderModel;
}

export function ThankYouPage({ orderModel }: ThankYouPageProps) {
  return (
    <>
      {!orderModel && <Refresh every={5} />}
      <div className="mt-20 flex flex-col items-center gap-4 xl:gap-10">
        <Image
          src="/img-celebration.png"
          alt="Vielen Dank für Deinen Einkauf!"
          width={120}
          height={120}
        />
        <h1 className="mt-10 text-center text-5xl font-bold text-secondary">
          Vielen Dank für Deinen Einkauf!
        </h1>
        <h2 className="text-2xl font-semibold text-secondary/50">
          So geht’s weiter:
        </h2>

        {!orderModel && (
          <div className="flex flex-row items-center gap-4">
            <span>
              Deine Bestellung wird gerade bearbeitet... Die Seite aktualisiert
              sich automatisch, sobald die Bestellung bearbeitet wurde!
            </span>
            <LoadingSvg className="animate-spin" />
          </div>
        )}
        {orderModel && (
          <>
            <div className="grid gap-4 lg:grid-cols-3 xl:gap-10">
              <CheckoutCard
                imgUrl="/img-coupon.png"
                title="1. Rabattcode deines DEALS kopieren"
                description="Kopiere deinen Rabattcode aus der unteren Übersicht oder aus der Bestellbestätigungs-E-Mail, die du erhalten hast."
              />
              <CheckoutCard
                imgUrl="/img-globe.png"
                title="2. Webseite des Deal-Partners besuchen "
                description="Besuche die Webseite des Deal-Partners durch Klicken des Buttons aus der unteren Übersicht oder aus der Bestellbestätigungs-E-Mail."
              />
              <CheckoutCard
                imgUrl="/img-discount.png"
                title="3. Deinen Rabattcode anwenden und sparen"
                description="Wähle ein Produkt auf der Webseite des Deal-Partners aus und wende deinen Rabattcode im Bestellvorgang an. Viel Spaß beim Sparen!"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-4 lg:gap-10">
              {orderModel.items?.map((item) => (
                <CheckoutOrderItem key={item.dealId} orderItemModel={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
