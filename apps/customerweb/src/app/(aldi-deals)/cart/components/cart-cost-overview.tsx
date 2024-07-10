'use client';

import { CartToCheckoutButton } from '@/app/(aldi-deals)/cart/components/cart-to-checkout-button';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { formatCurrency } from '@/utils/format-currency';

export function CartCostOverview() {
  const { cartContext } = useCart();
  if (!cartContext || !cartContext.cart) return null;

  const { total = 0, totalRegular = total, saving = 0 } = cartContext.cart;

  return (
    <div className="rounded-[20px] bg-neutral-100 p-10">
      <h1 className="mb-6 border-b border-neutral-200 pb-6 text-3xl font-bold text-secondary">
        Kostenübersicht
      </h1>
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-baseline gap-1">
            <h3 className="text-lg font-medium text-secondary">
              Zwischensumme
            </h3>
            <small className="text-secondary/50">inkl. MwSt.</small>
          </div>
          <p className="font-medium text-secondary ">
            {formatCurrency(totalRegular / 100, true)}
          </p>
        </div>
        {saving >= 0 && (
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-medium text-secondary">Du sparst</h3>
            <p className="font-medium text-primary ">
              - {formatCurrency(saving / 100, true)}
            </p>
          </div>
        )}
      </div>
      <div className="mb-6 flex flex-row justify-between border-b border-neutral-200 pb-6">
        <div className="flex flex-row items-baseline gap-1">
          <h3 className="text-xl font-bold text-secondary">Gesamtpreis</h3>
          <small className="text-secondary/50">inkl. MwSt.</small>
        </div>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(total / 100, true)}
        </p>
      </div>
      <CartToCheckoutButton />
    </div>
  );
}
