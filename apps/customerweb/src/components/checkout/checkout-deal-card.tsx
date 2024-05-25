'use client';

import Image from 'next/image';
import { Card, CardBody, SelectItem } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { AldiSelect } from '@/components/nextui/aldi-select';
import { CopyIconSvg } from '@/components/svg/aldi-copy-svg';
import { IconArrowUpRight } from '@/components/svg/icon-arrow-up-right';

// interface for the item
interface Item {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  validDate: string;
  mainImgUrl: string;
  code: string;
}

// interface for the component props
interface DealCheckoutCardProps {
  item: Item;
}
// Interface for the select options
interface SelectOption {
  id: number;
  text: string;
  icon: string;
  alt: string;
}
export default function DealCheckoutCard({ item }: DealCheckoutCardProps) {
  const options: SelectOption[] = [
    {
      id: 1,
      text: 'Apple Wallet',
      icon: '/icons/apple-icon.svg',
      alt: 'apple icon',
    },
    {
      id: 2,
      text: 'Android Wallet',
      icon: '/icons/android-icon.svg',
      alt: 'android icon',
    },
    {
      id: 3,
      text: 'PDF Dokument',
      icon: '/icons/pdf-icon.svg',
      alt: 'pdf icon',
    },
  ];

  return (
    <Card className="bg-gray-100">
      <CardBody className="flex flex-col gap-8 p-8 md:flex-row">
        <Image
          className="w-full md:w-1/3"
          src={item.mainImgUrl}
          alt="deal-image"
          width={420}
          height={378}
        />
        <div
          className={`flex flex-1 flex-col gap-6 ${
            item.code !== '' ? 'justify-between' : ''
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Image
                className="md:max-h-72 lg:h-full"
                src={item.imageSrc}
                alt={item.imageAlt}
                width={85}
                height={85}
              />
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary ">
                    {item.name}
                  </h1>
                  <p className="max-w-[300px] text-lg leading-5 text-aldi-blue">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
            {item.code !== '' ? (
              <AldiInput
                label="Dein Code"
                className="w-full md:w-96"
                readOnly
                value={item.code}
                endContent={<CopyIconSvg />}
              />
            ) : (
              ''
            )}
            <div>
              <p className="border-b-2 border-t-2 pb-4 pt-4 text-aldi-blue opacity-50">
                {item.validDate}
              </p>
            </div>
          </div>
          {item.code !== '' ? (
            <AldiButton
              size="lg"
              variant="solid"
              href="/auth"
              className="w-full md:max-w-72"
              endContent={<IconArrowUpRight className="text-2xl" />}
              color="secondary"
            >
              Gutscheincode einlösen
            </AldiButton>
          ) : (
            <div>
              <AldiSelect
                label="Herunterladen"
                items={options}
                color="aldiblue"
                className="w-full md:max-w-56"
              >
                {(option: any) => (
                  <SelectItem key={option.id} textValue={option.text}>
                    <div className="flex gap-2">
                      <Image
                        className="text-black"
                        src={option.icon}
                        width={20}
                        height={20}
                        alt={option.alt}
                      />
                      <p>{option.text}</p>
                    </div>
                  </SelectItem>
                )}
              </AldiSelect>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
