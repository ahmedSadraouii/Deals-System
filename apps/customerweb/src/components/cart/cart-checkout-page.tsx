'use client';

import { BillingAddress } from './cart-billing-address';
import { CostOverviewMobile } from './cost-overview-mobile';
import { ExpiredDeals } from './expired-deals';
import { PaymentMethods } from './payment-methods';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartMobile } from './shopping-cart-mobile';
import { useCart } from '@/app/contexts/cart/cart-context';

export function CheckoutPage() {
  const DealNotAvailable = false;
  const ExpiredReservation = false;
  const { currentStep } = useCart();
  return (
    <div
      className={`flex w-full flex-col gap-8 lg:flex-row  lg:justify-center ${currentStep === 2 ? 'flex' : 'hidden'}`}
    >
      <div className="flex w-full flex-col gap-8 lg:w-[50%]">
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
        <div className="md:hidden">
          <ShoppingCartMobile />
        </div>
        <BillingAddress />
        <PaymentMethods isCheckoutPage={true} />
        <div className="md:hidden">
          <CostOverviewMobile
            subtotal="225,00"
            discount="45,00"
            total="180,00"
            expired={false}
          />
        </div>
      </div>
      <div className="hidden md:block md:w-full lg:w-[50%]">
        <ShoppingCart
          subtotal="225,00"
          discount="45,00"
          total="180,00"
          expired={false}
        />
      </div>
    </div>
  );
}
