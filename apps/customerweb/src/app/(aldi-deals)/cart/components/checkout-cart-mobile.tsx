import React from 'react';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { CartItemList } from '@/app/(aldi-deals)/cart/components/cart-item-list';
import { ReservationTimer } from '@/app/(aldi-deals)/cart/components/reservation-timer';

export default function CheckoutCartMobile() {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex w-full flex-row items-center justify-between pb-2">
        <h1 className=" text-3xl font-bold text-secondary">Warenkorb</h1>
        <Link
          as={NextLink}
          href="/cart"
          size="lg"
          color="secondary"
          underline="always"
        >
          Bearbeiten
        </Link>
      </div>
      <div>
        <ReservationTimer />
      </div>

      <div>
        <CartItemList editable={false} isCheckoutPage={true} />
      </div>
    </div>
  );
}
