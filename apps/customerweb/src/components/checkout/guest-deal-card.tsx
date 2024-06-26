import { Suspense } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import { Card, CardBody, SelectItem } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { AldiSelect } from 'src/components/nextui/aldi-select';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

// interface for the component props
interface DealCheckoutCardProps {
  deal: UmbracoDeal;
}
// Interface for the select options
interface SelectOption {
  id: number;
  text: string;
  icon: string;
  alt: string;
}
export default async function GuestDealCard({ deal }: DealCheckoutCardProps) {
  const contentApi = getContentApiClient();

  const description = deal.properties?.description;

  let supplierContent;
  try {
    supplierContent = await contentApi.getContentItemById20({
      id: deal.properties?.supplier!.id!,
    });
  } catch (error) {
    console.error('Error fetching supplier content:', error);
    return null;
  }

  const fullSupplier = supplierContent as UmbracoSupplier;

  if (!verifySupplierIsCorrect(fullSupplier)) {
    console.log('Supplier is incorrect', fullSupplier);
    return null;
  }
  const primaryImage = deal.properties?.pictures?.[0]?.url;
  const supplierImage = fullSupplier.properties?.picture?.[0]?.url;

  const productImageUrl =
    primaryImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${primaryImage}`,
      width: 768,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });

  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco${supplierImage}`,
      width: 256,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  const promotionStart = DateTime.fromISO(deal.properties?.promotionStart!);
  const promotionEnd = DateTime.fromISO(deal.properties?.promotionEnd!);

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
    <Suspense>
      <Card className="bg-neutral-100">
        <CardBody className="flex  flex-col gap-8 p-10 md:min-h-[35vh] md:flex-row">
          <Image
            className="rounded-lg"
            src={productImageUrl!}
            alt={deal.name}
            width={450}
            height={500}
          />

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <Image
                className="md:max-h-72 lg:h-full"
                src={supplierImageUrl!}
                alt={fullSupplier.name}
                width={85}
                height={85}
              />
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary ">
                    {deal.name}
                  </h1>
                  <p className="max-w-[300px] text-lg leading-5 text-aldi-blue">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className=" border-t-2 pb-2 pt-4 text-aldi-blue opacity-50">
                Gültig ab:{' '}
                {promotionStart.isValid
                  ? promotionStart.toLocaleString(DateTime.DATE_SHORT)
                  : 'unbekannt'}{' '}
              </p>
              <p className="border-b-2 pb-4 text-aldi-blue opacity-50">
                Gültig bis:{' '}
                {promotionEnd.isValid
                  ? promotionEnd.toLocaleString(DateTime.DATE_SHORT)
                  : 'unbekannt'}
              </p>
            </div>
            <div>
              <AldiSelect
                label="Herunterladen"
                items={options}
                className="w-full md:max-w-56"
              />
              {options.map((option) => (
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
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Suspense>
  );
}
