import React from 'react';
import Image from 'next/image';
import { Price } from '@/components/price';

export interface SliderCardProps {
  data: {
    image: string;
    price: number;
    discountPrice: number;
  };
}

export function SliderCard({
  data: { image, price, discountPrice },
}: SliderCardProps) {
  return (
    <>
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow">
        <a href="#">
          <div
            className="relative h-[300px] rounded-lg !bg-cover !bg-center md:h-[300px]"
            style={{ background: `url('${image}')` }}
          >
            <span className="absolute right-5 top-5 flex rounded bg-gray-100 px-4 py-2 text-xs font-light text-black">
              <Image
                src="/icons/last-minute-icon.svg"
                width={15}
                height={10}
                alt="last minute icon"
                className="mr-2"
              />{' '}
              Last minute!
            </span>
          </div>
        </a>
        <div className="px-5 pb-5">
          <div className="mb-5 mt-2.5 flex items-center justify-between">
            <span className="px-0 py-2">
              <Image
                src="/logos/check24-logo.svg"
                width={105}
                height={30}
                alt="last minute icon"
                className="mr-2"
              />
            </span>
            <div className="ms-3 flex items-center space-x-1 rtl:space-x-reverse">
              <div className="flex items-center rounded border-1 px-4 py-2 font-extralight text-aldi-text">
                <Image
                  src="/icons/clock-icon.svg"
                  width={20}
                  height={15}
                  alt="clock icon"
                  className="mr-2"
                />
                13:32:16
              </div>
            </div>
          </div>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              Köln - Hamburg für 2 Personen – 2 für 1 Tickets!
            </h5>
          </a>
          <div className="mt-5 flex items-center justify-between">
            <Price
              price={price}
              discountedPrice={discountPrice}
              textSize={1}
              textColor={1}
              uvp={false}
            />
            <a href="#" className="ml-2">
              <Image
                src="/icons/link-icon.svg"
                width={35}
                height={30}
                alt="last minute icon"
                className="mr-2"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderCard;
