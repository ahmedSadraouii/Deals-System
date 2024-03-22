import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export interface OrderProductItemProps {
  name: string;
  description: string;
  count: number;
  image: string;
  link: string;
}

export function OrderProductItem({
  name,
  description,
  image,
  link,
}: OrderProductItemProps) {
  return (
    <div>
      <div className="flex flex-auto items-center justify-between">
        <div className="flex">
          <div>
            <Image src={image} width={100} height={20} alt="logo" />
          </div>
          <div className="ml-6 flex flex-col  items-start justify-center text-left">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>
            <h2 className="text-base font-semibold leading-7 text-gray-500">
              {description}
            </h2>
            <p className="text-xs text-gray-400">Gültig bis: 10.02.2025</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="mr-4 mt-5 w-full rounded-full bg-black px-8 py-6 text-center text-sm font-medium text-white"
          >
            Download
          </Button>

          <Link
            href={link}
            className="border-1 mt-5 flex w-full rounded-full border-black bg-transparent px-8 py-4 text-center text-sm font-medium text-black"
          >
            Details
            <Image
              src="/icons/order-right-icon.svg"
              width={14}
              height={14}
              alt="profil icon"
              className="ml-3"
            />
          </Link>
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
