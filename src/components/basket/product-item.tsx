import React from 'react';
import Image from 'next/image'
import {Button} from "@nextui-org/react";
import Price from "@/components/price";

const ProductItem = (props: { name: string, description: string, price: number, count: number, image: string }) => {
  return (
    <div>
      <div className="flex flex-auto items-center justify-between">
        <div className="flex ">
          <div>
            <Image
              src={props.image}
              width={100}
              height={20}
              alt="logo"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{props.name}</h1>
            <h2 className="text-base font-semibold leading-7 text-gray-500">{props.description}</h2>
            <Price price={props.price} discountedPrice={0} uvp={false} textSize={1} textColor={2}></Price>
          </div>
        </div>
        <div className="flex border-2 px-0 py-0 rounded-full justify-between items-center">
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
      <hr className="mt-5 mb-10"/>
      <div className="flex justify-between">
        <div></div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
