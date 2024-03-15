import React from 'react';
import Price from "@/components/price";
import Image from 'next/image'

const SliderCard = (props: any) => {
  return (
    <>
      <div
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
          <div className="md:h-[300px] h-[300px] !bg-center !bg-cover rounded-lg relative"
               style={{background: `url('${props.data.image}')`}}>
            <span className="flex bg-gray-100 text-black text-xs font-light px-4 py-2 rounded absolute right-5 top-5">
              <Image
                src="/icons/last-minute-icon.svg"
                width={15}
                height={10}
                alt="last minute icon"
                className="mr-2"
              /> Last minute!
            </span>
          </div>
        </a>
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mt-2.5 mb-5">
            <span className="px-0 py-2">
              <Image
                src="/logos/check24-logo.svg"
                width={105}
                height={30}
                alt="last minute icon"
                className="mr-2"
              />
            </span>
            <div className="flex items-center space-x-1 rtl:space-x-reverse ms-3">
              <div className="border-1 aldi-text-color font-extralight rounded py-2 px-4 flex items-center">
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
          <div className="flex items-center justify-between mt-5">
            <Price price={props.data.price} discountedPrice={props.data.discountPrice} textSize={1} uvp={false}
                   textColor={1}></Price>
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
};

export default SliderCard;
