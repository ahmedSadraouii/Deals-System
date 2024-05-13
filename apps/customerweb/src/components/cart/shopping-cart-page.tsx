'use client';

import { CartItems } from './cart-items';
import { CostOverview } from './cost-overview';
import { ExpiredDeals } from './expired-deals';
import { PaymentMethods } from './payment-methods';
import { ReservationTime } from './reservation-time';
import { useCart } from '@/app/contexts/cart/cart-context';

export function ShoppingCartPage() {
  const DealNotAvailable = false;
  const ExpiredReservation = false;
  const { currentStep } = useCart();
  return (
    <div className={`${currentStep === 1 ? '' : 'hidden'}`}>
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
            <ReservationTime time="12:59" />
          </div>
        )}
        <div className="flex w-full flex-col gap-8">
          <CartItems expired={ExpiredReservation} />
          <div className="block lg:hidden">
            <CostOverview
              subtotal="225,00"
              discount="45,00"
              total="180,00"
              expired={ExpiredReservation}
            />
          </div>
          <PaymentMethods isCheckoutPage={false} />
        </div>
        <div className="hidden  gap-8 lg:flex lg:flex-col">
          {!ExpiredReservation && <ReservationTime time="12:59" />}
          <CostOverview
            subtotal="225,00"
            discount="45,00"
            total="180,00"
            expired={ExpiredReservation}
          />
        </div>
      </div>
    </div>
  );
}
