import type { ReactNode } from 'react';
import { CartProvider } from '@/app/contexts/cart/cart-context';
import { Stepper } from '@/components/cart/cart-steps';

export interface CartLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: CartLayoutProps) {
  return (
    <CartProvider>
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
        <div className="w-full lg:w-[70%]">
          <Stepper />
        </div>
        {children}
      </div>
    </CartProvider>
  );
}