import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { Price } from '@/components/price';

export interface CartProductItemProps {
  name: string;
  description: string;
  price: number;
  count: number;
  image: string;
}

export function CartProductItem({
  name,
  description,
  price,
  image,
}: CartProductItemProps) {
  return (
    <div>
      <div className="flex flex-auto items-center justify-between">
        <div className="flex">
          <div>
            <Image src={image} width={100} height={20} alt="logo" />
          </div>
          <div className="ml-6">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">
              {name}
            </h1>
            <h2 className="text-base font-semibold leading-7 text-neutral-500">
              {description}
            </h2>
            <Price oldPrice={price} actualPrice={0} uvp={false} textSize={1} />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-full border-2 px-0 py-0">
          <div>
            <Button type="button" className="bg-transparent">
              <Image
                src="/icons/minus-icon.svg"
                width={30}
                height={20}
                alt="logo"
              />
            </Button>
          </div>
          <div className="w-10 text-center font-bold">2</div>
          <div>
            <Button type="button" className="bg-transparent">
              <Image
                src="/icons/plus-icon.svg"
                width={30}
                height={20}
                alt="logo"
              />
            </Button>
          </div>
        </div>
      </div>
      <hr className="mb-10 mt-5" />
      <div className="flex justify-between">
        <div />
        <div />
      </div>
    </div>
  );
}
