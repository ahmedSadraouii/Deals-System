import { CartItemList } from '@/app/cart/components/cart-item-list';
import { CartRequired } from '@/app/cart/components/cart-required';
import { CartStepIndicator } from '@/app/cart/components/cart-step-indicator';
import { ReservationTimer } from '@/app/cart/components/reservation-timer';
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
      <div className="mt-20 grid grid-cols-12 gap-10">
        <div className="col-span-9 flex flex-col gap-10">
          <div className="rounded-[20px] bg-gray-100 p-10">
            <h1 className="mb-10 text-4xl font-bold text-secondary">
              Dein Warenkorb
            </h1>
            <div>
              <CartItemList />
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 rounded-[20px] bg-gray-100 p-10">
            <h2 className="text-lg font-medium text-secondary">
              Wir unterstützen folgende Zahlungsmethoden
            </h2>
            <div className="flex flex-row gap-6">
              <PaymentIconMastercard />
              <PaymentIconVisa />
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col">
          <ReservationTimer />
        </div>
      </div>
    </CartRequired>
  );
}
