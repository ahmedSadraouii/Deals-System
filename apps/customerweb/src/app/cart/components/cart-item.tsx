'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import { Spinner } from '@nextui-org/react';
import type { CartItemModel } from 'api-deals/generated/models/CartItemModel';
import { getDealAction } from '@/app/cart/actions/get-deal.action';
import { getSupplierAction } from '@/app/cart/actions/get-supplier.action';
import { useCart } from '@/app/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format-currency';

export interface CartItemProps {
  cartItem: CartItemModel;
}

export function CartItem({ cartItem }: CartItemProps) {
  const { removeCartItem, updateCartItem } = useCart();

  const [deal, setDeal] = useState<UmbracoDeal | undefined>(undefined);
  const [supplierImageUrl, setSupplierImageUrl] = useState<string | undefined>(
    undefined,
  );
  const [isRemovingDeal, setIsRemovingDeal] = useState(false);

  const increment = useCallback(async () => {
    await updateCartItem(cartItem.dealId, cartItem.quantity + 1);
  }, [cartItem.dealId, cartItem.quantity, updateCartItem]);

  const decrement = useCallback(async () => {
    const newQuantity = Math.max(1, cartItem.quantity - 1);
    await updateCartItem(cartItem.dealId, newQuantity);
  }, [cartItem.dealId, cartItem.quantity, updateCartItem]);

  useEffect(() => {
    (async function () {
      const deal = await getDealAction({
        dealId: cartItem.dealId,
      });
      setDeal(deal);
      const supplier = await getSupplierAction({
        supplierId: deal.properties!.supplier.id,
      });

      const supplierImage = supplier.properties?.picture?.[0]?.url;

      const supplierImageUrl =
        supplierImage &&
        defaultLoader({
          src: `https://dev.api.aldi.amplicade.com/umbraco${supplierImage}`,
          width: 256,
          config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
        });

      setSupplierImageUrl(supplierImageUrl);
    })();
  }, [cartItem.dealId]);

  const onClickRemoveDeal = useCallback(async () => {
    setIsRemovingDeal(true);
    await removeCartItem(cartItem.dealId);
    setIsRemovingDeal(false);
  }, [cartItem.dealId, removeCartItem]);

  if (!deal) {
    return (
      <div className="flex flex-row gap-4 py-6">
        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-[20px] bg-neutral-200">
          <div className="h-[88px] w-[88px]" />
        </div>
        <div className="flex grow flex-col justify-center gap-2 text-secondary">
          <h2 className="text-lg font-medium">
            <span className="inline-block h-4 w-full max-w-48 animate-pulse rounded-lg bg-neutral-200" />
          </h2>
          <p className="text-sm">
            <span className="inline-block h-4 w-full max-w-56 animate-pulse rounded-lg bg-neutral-200" />
          </p>
          <span className="inline-block h-4 w-full  max-w-24 animate-pulse rounded-lg bg-neutral-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-4 py-6">
      {!supplierImageUrl && (
        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-[20px] bg-neutral-200">
          <div className="h-[88px] w-[88px]" />
        </div>
      )}
      {supplierImageUrl && (
        <div className="flex h-24 w-24 items-center justify-center rounded-[20px] bg-neutral-200">
          <Image
            src={supplierImageUrl}
            alt="Jober"
            width={88}
            height={88}
            className="shrink-0 object-contain"
          />
        </div>
      )}
      <div className="flex grow flex-col justify-center gap-2 text-secondary">
        <h2 className="text-lg font-medium">{deal.name}</h2>
        <p className="text-sm">Anzahl insgesamt: {cartItem.quantity}</p>
        <button
          onClick={onClickRemoveDeal}
          className={cn(
            'items-c enter inline-flex w-fit gap-2 underline',
            isRemovingDeal && 'opacity-50',
          )}
          color="secondary"
          disabled={isRemovingDeal}
        >
          {isRemovingDeal && <Spinner color="secondary" size="sm" />}
          <span>Entfernen</span>
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-end">
          {deal.properties?.regularPrice && (
            <div className="text-secondary line-through">
              {formatCurrency(deal.properties?.regularPrice, true)}
            </div>
          )}
          {deal.properties?.price && (
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(deal.properties?.price, true)}
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          <AldiButton
            variant="ghost"
            color="secondary"
            isIconOnly={true}
            size="md"
            onClick={decrement}
            isDisabled={cartItem.quantity <= 1}
          >
            -
          </AldiButton>
          <div className="min-w-8 text-center text-3xl font-bold text-secondary">
            {cartItem.quantity}
          </div>
          <AldiButton
            variant="ghost"
            color="secondary"
            isIconOnly={true}
            size="md"
            onClick={increment}
            isDisabled={
              cartItem.quantity + 1 > (deal.properties?.maxOrderQuantity || 0)
            }
          >
            +
          </AldiButton>
        </div>
      </div>
    </div>
  );
}
