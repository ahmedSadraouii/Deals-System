import {CartItems} from '@/components/cart/cart-items';
import {Stepper} from '@/components/cart/cart-steps';
import PaymentMethods from '@/components/cart/payment-methods';

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 py-14">
      <div className="w-full lg:w-[70%]">
        <Stepper />
      </div>
      <div className="flex w-full">
        <div className="flex flex-col gap-8">
          <CartItems />
          <PaymentMethods />
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}