import { CartProvider } from '@/app/contexts/cart/cart-context';
import { CheckoutPage } from '@/components/cart/cart-checkout-page';
import { Stepper } from '@/components/cart/cart-steps';
import { ShoppingCartPage } from '@/components/cart/shopping-cart-page';

export default function Page() {
  return (
    <CartProvider>
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
        <div className="w-full lg:w-[70%]">
          <Stepper />
        </div>
        <ShoppingCartPage />
        <CheckoutPage />
      </div>
    </CartProvider>
  );
}
