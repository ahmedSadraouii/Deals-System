import { CartItems } from '@/components/cart/cart-items';
import { Stepper } from '@/components/cart/cart-steps';
import { CostOverview } from '@/components/cart/cost-overview';
import { ExpiredDeals } from '@/components/cart/expired-deals';
import { PaymentMethods } from '@/components/cart/payment-methods';
import { ReservationTime } from '@/components/cart/reservation-time';

export default function Page() {
  const DealNotAvailable = true;
  const ExpiredReservation = false;
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="w-full lg:w-[70%]">
        <Stepper />
      </div>
      {DealNotAvailable && (
        <div className=" w-full">
          <ExpiredDeals description="Einer deiner Deals ist nicht mehr verfügbar oder abgelaufen. Entdecke weitere tolle Deals ." />
        </div>
      )}
      {ExpiredReservation && (
        <div className="w-full">
          <ExpiredDeals description="Dein Warenkorb wurde zurückgesetzt, da die Reservierungszeit von 20 Minuten abgelaufen ist!" />
        </div>
      )}
      <div className="flex w-full flex-col gap-8 lg:flex-row  lg:justify-center">
        {!ExpiredReservation && (
          <div className="lg:hidden">
            <ReservationTime />
          </div>
        )}
        <div className="flex w-full flex-col gap-8">
          <CartItems expired={ExpiredReservation} />
          <div className="block lg:hidden">
            <CostOverview expired={ExpiredReservation} />
          </div>
          <PaymentMethods />
        </div>
        <div className="hidden  gap-8 lg:flex lg:flex-col">
          {!ExpiredReservation && <ReservationTime />}
          <CostOverview expired={ExpiredReservation} />
        </div>
      </div>
    </div>
  );
}
