'use client';

import React, { useState } from 'react';
import { SelectItem } from '@nextui-org/react';
import { AldiSelect } from '@/components/nextui/aldi-select';
import { MinusIconSvg } from '@/components/svg/cart-minus-svg';
import { PlusIconSvg } from '@/components/svg/cart-plus-svg';

export function CartCounter() {
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setCount(selectedValue);
  };
  const options = Array.from({ length: 10 }, (_, index) =>
    (index + 1).toString(),
  ); // Array of strings from '1' to '10'
  return (
    <>
      <div className="hidden items-center justify-center space-x-4 md:flex">
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
      <AldiSelect
        className="w-[80px] md:hidden"
        defaultSelectedKeys={['1']}
        selectedKeys={[`${count}`]}
        onChange={handleChange}
      >
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </AldiSelect>
    </>
  );
}
