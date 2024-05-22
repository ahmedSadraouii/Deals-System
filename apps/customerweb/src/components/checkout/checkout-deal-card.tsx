'use client';

import Image from 'next/image';
import { AldiButton } from '../nextui/aldi-button';
import { IconArrowUpRight } from '../svg/icon-arrow-up-right';
import { Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';

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
export default function DealCheckoutCard({ item }: DealCheckoutCardProps) {
  const options = [
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
              <Input label="Dein Code" readOnly value={item.code} />
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
              className="max-w-72"
              endContent={<IconArrowUpRight className="text-2xl" />}
              color="secondary"
            >
              Gutscheincode einlösen
            </AldiButton>
          ) : (
            <div>
              <Select
                label="Herunterladen"
                items={options}
                color="primary"
                className="max-w-56"
              >
                {(option) => (
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
              </Select>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
