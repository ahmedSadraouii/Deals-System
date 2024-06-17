'use client';

import React, { useContext } from 'react';
import { IconCart } from 'src/components/svg/icon-cart';
import { FavoriteContext } from '@/app/contexts/favorite/favorite-context';

export function CartHeaderIcon() {
  const { favoredDealIds } = useContext(FavoriteContext);
  const numberOfDeals = favoredDealIds.length;
  return (
    <div>
      <IconCart className="text-2xl" />
      <div className="absolute left-8 z-[1000] h-6 w-6 rounded-full bg-aldi-key text-white">
        {numberOfDeals}
      </div>
    </div>
  );
}
