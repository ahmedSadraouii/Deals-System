import React from 'react';
import MenuBar from '@/components/account/menu-bar';
import { OrderProductItem } from '@/components/account/order-product-item';

export default function Page() {
  return (
    <div className="container mx-auto py-14">
      <MenuBar />

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="rounded-xl bg-gray-100 p-5">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex items-center">
              <h1 className="ml-4 text-xl font-bold">Deine erworbenen Deals</h1>
            </div>
            <hr className="mb-10 border-b-2" />
            <div className="mx-auto mb-10 rounded-3xl bg-gray-100">
              <OrderProductItem
                name="Mud Masters Tickets"
                description="2 Tickets zum Preis von 1"
                count={2}
                image="/img_1.png"
                link="/profile/orders/1"
              />
              <OrderProductItem
                name="Mud Masters Tickets"
                description="2 Tickets zum Preis von 1"
                count={2}
                image="/img_1.png"
                link="/profile/orders/1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
