'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SelectItem, Spinner } from '@nextui-org/react';
import type { CartItemModel } from 'api-deals';
import { getDealAction } from '@/app/(aldi-deals)/cart/actions/get-deal.action';
import { getSupplierAction } from '@/app/(aldi-deals)/cart/actions/get-supplier.action';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiSelect } from '@/components/nextui/aldi-select';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { cn } from '@/utils/cn';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { formatCurrency } from '@/utils/format-currency';
import {
  trackCheckoutStep1,
  trackCheckoutStep2,
  trackPageView,
} from '@/utils/tracking';

export interface CartItemProps {
  cartItem: CartItemModel;
  editable?: boolean;
  isCheckoutPage?: boolean;
}

export function CartItem({
  cartItem,
  editable = true,
  isCheckoutPage = false,
}: CartItemProps) {
  const { cartContext, removeCartItem, updateCartItem } = useCart();
  const hasTrackedPageView = useRef(false);

  const [deal, setDeal] = useState<UmbracoDeal | undefined>(undefined);
  const [supplier, setSupplier] = useState<UmbracoSupplier | undefined>(
    undefined,
  );
  const [supplierImageUrl, setSupplierImageUrl] = useState<string | undefined>(
    undefined,
  );
  const [isRemovingDeal, setIsRemovingDeal] = useState(false);
  const [isChangingQuantity, setChangingQuantity] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(cartItem.quantity);

  const handleQuantityChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      setChangingQuantity(true);
      const newQuantity = parseInt(event.target.value, 10);
      await updateCartItem(cartItem.dealId, newQuantity);
      setSelectedQuantity(newQuantity);
      setChangingQuantity(false);
    },
    [cartItem.dealId, updateCartItem],
  );

  const increment = useCallback(async () => {
    setChangingQuantity(true);
    await updateCartItem(cartItem.dealId, cartItem.quantity + 1);
    setChangingQuantity(false);
  }, [cartItem.dealId, cartItem.quantity, updateCartItem]);

  const decrement = useCallback(async () => {
    setChangingQuantity(true);
    const newQuantity = Math.max(1, cartItem.quantity - 1);
    await updateCartItem(cartItem.dealId, newQuantity);
    setChangingQuantity(false);
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
      setSupplier(supplier);
      if (!hasTrackedPageView.current) {
        if (isCheckoutPage) trackCheckoutStep2(supplier.name, deal.name);
        else {
          trackCheckoutStep1(supplier.name, deal.name);
          trackPageView({
            pageName: 'aldi-deals-profile',
            pageType: 'aldi-sued-ci-template',
            primaryCategory: 'ALDI SUED CI',
            subCategory: 'aldi-deals',
            subSubCategory: 'cart',
          });
        }
        hasTrackedPageView.current = true;
      }

      const supplierImage =
        supplier.properties?.picture?.[0]?.url &&
        fixUmbracoMediaLink(supplier.properties?.picture?.[0]?.url);

      setSupplierImageUrl(supplierImage);
    })();
  }, [cartItem.dealId, isCheckoutPage]);

  const options = Array.from(
    { length: deal?.properties?.maxOrderQuantity || 10 },
    (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString(),
    }),
  );

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
        {editable && (
          <>
            <div className="flex grow flex-row gap-4">
              <div className="flex w-full grow flex-col items-end justify-center gap-2">
                <span className="inline-block h-4 w-full max-w-16 animate-pulse rounded-lg bg-neutral-200" />
                <span className="inline-block h-8 w-full max-w-28 animate-pulse rounded-lg bg-neutral-200" />
              </div>
            </div>
            <div className="flex basis-32 flex-row items-center gap-4">
              <span className="inline-block h-8 w-full max-w-32 animate-pulse rounded-lg bg-neutral-200" />
            </div>
          </>
        )}
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
        <div
          className={cn(
            'hidden h-24 w-24 rounded-[20px] bg-neutral-200 md:flex md:items-center md:justify-center',

            (!cartItem.available || cartContext.cartExpired) && 'opacity-30',
          )}
        >
          <Image
            src={supplierImageUrl}
            alt={supplier?.name ?? 'supplier'}
            width={88}
            height={88}
            className="shrink-0 object-contain"
          />
        </div>
      )}
      <div
        className={cn(
          'flex grow flex-col justify-center gap-2 text-secondary',
          (!cartItem.available || cartContext.cartExpired) && 'opacity-30',
        )}
      >
        <h2 className="flex-grow text-lg font-medium">{deal.name}</h2>
        <p className="text-sm">Anzahl insgesamt: {cartItem.quantity}</p>

        {editable && (
          <button
            onClick={onClickRemoveDeal}
            className={cn(
              'inline-flex w-fit items-center gap-2',
              isRemovingDeal && 'opacity-50',
              (!cartItem.available || cartContext.cartExpired) && 'underline',
            )}
            color="secondary"
            disabled={
              isChangingQuantity ||
              isRemovingDeal ||
              !cartItem.available ||
              cartContext.cartExpired
            }
          >
            {isRemovingDeal && <Spinner color="secondary" size="sm" />}
            <span className="underline">
              {cartItem.available ? 'Entfernen' : 'Abgelaufen'}
            </span>
          </button>
        )}
      </div>

      <div className="hidden md:flex md:flex-row md:gap-4">
        {cartItem.available && !cartContext.cartExpired && (
          <>
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
            {editable && (
              <div className="flex flex-row items-center gap-2">
                <AldiButton
                  variant="ghost"
                  color="secondary"
                  isIconOnly={true}
                  size="md"
                  onClick={decrement}
                  isDisabled={isRemovingDeal || cartItem.quantity <= 1}
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
                    isRemovingDeal ||
                    cartItem.quantity + 1 >
                      (deal.properties?.maxOrderQuantity || 0)
                  }
                >
                  +
                </AldiButton>
              </div>
            )}
          </>
        )}
        {!cartItem.available && (
          <div className="max-w-xs rounded-lg bg-primary/10 p-3 text-primary">
            Dieser Deal ist leider abgelaufen! Er wird im Checkout Prozess und
            für den Gesamtpreis nicht beachtet.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {editable && (
          <div className="flex flex-row items-center gap-2">
            <AldiSelect
              selectedKeys={[selectedQuantity.toString()]}
              onChange={handleQuantityChange}
              disabled={isRemovingDeal || isChangingQuantity}
            >
              {options.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </AldiSelect>
          </div>
        )}
        {cartItem.available && !cartContext.cartExpired && (
          <>
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
          </>
        )}
        {!cartItem.available && (
          <div className="max-w-xs rounded-lg bg-primary/10 p-3 text-primary">
            Dieser Deal ist leider abgelaufen! Er wird im Checkout Prozess und
            für den Gesamtpreis nicht beachtet.
          </div>
        )}
      </div>
    </div>
  );
}
