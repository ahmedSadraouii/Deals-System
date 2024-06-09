'use client';

import React from 'react';
import Image from 'next/image';
import { IconOnline } from 'src/components/svg/icon-nur-online';
import { HeartFavorite } from '@/components/heart-favorite';
import { Price } from '@/components/price';
import { IconClock } from '@/components/svg/icon-clock';

export interface ProductItemProps {
  price: number;
  discountPrice: number;
  image: string;
}

export function ProductItem({ price, discountPrice, image }: ProductItemProps) {
  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 bg-gray-100 shadow">
        <a href="#">
          <div
            className="relative h-[250px] rounded-lg !bg-cover !bg-center md:h-[250px]"
            style={{ background: `url('${image}')` }}
          >
            <div className="flex items-center justify-between p-4">
              <span className="flex items-center rounded bg-gray-100 px-4 py-2 text-xs font-light text-black">
                <IconOnline className="mr-2 text-base" />
                <span className="text-aldi-key">Nur Online</span>
              </span>
              <HeartFavorite dealId={'1'} />
            </div>
          </div>
        </a>
        <div className="px-5 pb-5">
          <div className="mb-5 mt-2.5 flex items-center justify-between">
            <span className="px-0 py-2">
              <Image
                src="/logos/check24-logo.svg"
                width={105}
                height={26}
                alt="last minute icon"
                className="mr-2"
              />
            </span>
            <div className="ms-3 flex items-center space-x-1 rtl:space-x-reverse">
              <div className="flex items-center rounded border-1 px-4 py-2 font-normal text-aldi-key">
                <IconClock className="mr-2" />
                13:32:16
              </div>
            </div>
          </div>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-aldi-blue">
              Köln - Hamburg für 2 Personen – 2 für 1 Tickets!
            </h5>
          </a>
          <div className="mt-5 flex items-center justify-between">
            <Price
              oldPrice={price}
              actualPrice={discountPrice}
              textSize={1}
              uvp={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
