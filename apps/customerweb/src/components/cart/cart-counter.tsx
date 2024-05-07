'use client';

import React, { useState } from 'react';
import { MinusIconSvg } from '@/components/svg/cart-minus-svg';
import { PlusIconSvg } from '@/components/svg/cart-plus-svg';

export function CartCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-secondary "
        onClick={decrement}
      >
        <MinusIconSvg />
      </button>
      <p className="text-2xl font-semibold">{count}</p>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-secondary  "
        onClick={increment}
      >
        <PlusIconSvg />
      </button>
    </div>
  );
}