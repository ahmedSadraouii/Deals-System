import { CartCostOverview } from '@/app/(aldi-deals)/cart/components/cart-cost-overview';
import { CartExpiredErrorMessage } from '@/app/(aldi-deals)/cart/components/cart-expired-error-message';
import { CartItemList } from '@/app/(aldi-deals)/cart/components/cart-item-list';
import { CartRequired } from '@/app/(aldi-deals)/cart/components/cart-required';
import { CartStepIndicator } from '@/app/(aldi-deals)/cart/components/cart-step-indicator';
import { ReservationTimer } from '@/app/(aldi-deals)/cart/components/reservation-timer';
import { PaymentIconMastercard } from '@/components/svg/payment-icon-mastercard';
import { PaymentIconVisa } from '@/components/svg/payment-icon-visa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <CartRequired>
      <div className="mx-auto max-w-5xl">
        <CartStepIndicator step={1} />
      </div>
      <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <CartExpiredErrorMessage />
        <div className="col-span-8 block lg:hidden">
          <ReservationTimer />
        </div>
        <div className="col-span-8 flex flex-col gap-10">
          <div className="rounded-[20px] bg-neutral-100 p-10">
            <h1 className="border-b pb-4 text-3xl font-bold text-secondary">
              Dein Warenkorb
            </h1>
            <div>
              <CartItemList />
            </div>
          </div>

          <div className="hidden rounded-[20px] bg-neutral-100 p-10 lg:flex lg:flex-col lg:items-center lg:gap-5">
            <h2 className="text-lg font-medium text-secondary">
              Wir unterstützen folgende Zahlungsmethoden
            </h2>
            <div className="flex flex-row gap-6 ">
              <PaymentIconMastercard />
              <PaymentIconVisa />
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-10 lg:col-span-4">
          <div className="hidden lg:block">
            <ReservationTimer />
          </div>
          <div className="w-full">
            <CartCostOverview />
          </div>
          <div className="hidden rounded-[20px] bg-neutral-100 p-10 md:flex md:flex-col md:items-center md:gap-5 lg:hidden">
            <h2 className="text-lg font-medium text-secondary">
              Wir unterstützen folgende Zahlungsmethoden
            </h2>
            <div className="flex flex-row gap-6 ">
              <PaymentIconMastercard />
              <PaymentIconVisa />
            </div>
          </div>
        </div>
      </div>
    </CartRequired>
  );
}
