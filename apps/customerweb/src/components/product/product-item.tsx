import React from 'react';
import Image from 'next/image';
import { IconHeart } from 'src/components/svg/icon-heart';
import { IconOnline } from 'src/components/svg/icon-nur-online';
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
            <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center  rounded-full bg-orange-100 text-xs font-light text-black">
              <IconHeart fill="orange-500" />
            </span>
            <span className="absolute left-5 top-5 flex items-center rounded bg-gray-100 px-4 py-2 text-xs font-light text-black">
              <IconOnline className="mr-2 text-base" />
              <span className="text-aldi-blue">Nur Online</span>
            </span>
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
