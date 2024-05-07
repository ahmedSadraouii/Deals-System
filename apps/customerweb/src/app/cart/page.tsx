import { CartItems } from '@/components/cart/cart-items';
import { Stepper } from '@/components/cart/cart-steps';
import { CostOverview } from '@/components/cart/cost-overview';
import { PaymentMethods } from '@/components/cart/payment-methods';
import { ReservationTime } from '@/components/cart/reservation-time';

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="w-full lg:w-[70%]">
        <Stepper />
      </div>
      <div className="flex w-full flex-col gap-8 lg:flex-row  lg:justify-center">
        <div className="lg:hidden">
          <ReservationTime />
        </div>
        <div className="flex flex-col gap-8">
          <CartItems />
          <div className="block lg:hidden">
            <CostOverview />
          </div>
          <PaymentMethods />
        </div>
        <div className="hidden  gap-8 lg:flex lg:flex-col">
          <ReservationTime />
          <CostOverview />
        </div>
      </div>
    </div>
  );
}