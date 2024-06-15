import React from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import NotFound from '@/app/not-found';
import { CodeField } from '@/app/profile/orders/code-field';
import { AldiButton } from '@/components/nextui/aldi-button';
import { ArrowUpRightSvg } from '@/components/svg/arrow-up-right-svg';
import { EmailSvg } from '@/components/svg/email-svg';
import { IconArrowLeft } from '@/components/svg/icon-arrow-left';
import { InfoSquareSvg } from '@/components/svg/info-square-svg';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getContentApiClient } from '@/utils/content-api-client';
import { getHonoredDealsApiClient } from '@/utils/deals-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const contentApi = getContentApiClient();
  const honoredDealsApi = getHonoredDealsApiClient({
    accessToken: session?.accessToken,
  });

  const honoredDealsResponse = await honoredDealsApi.honoredDeals();
  const honoredDealsList = honoredDealsResponse.items || [];

  const matchingHonoredDeal = honoredDealsList.find((deal) => deal.id === id);

  if (!matchingHonoredDeal) {
    return <NotFound />;
  }

  // TODO: SUPER HACKY TEMPORARY WORKAROUND; REMOVE THIS
  const dangerousAlternativeDealId = 'feb16710-a8c4-4739-950e-e315772540a0';

  const deal = await contentApi
    .getContentItemById20({
      // id: matchingHonoredDeal.dealId!,
      id: dangerousAlternativeDealId,
    })
    .catch(catchApiError)
    .then((deal) => deal as UmbracoDeal);

  if (!deal) {
    console.error('Deal behind honoredDeal not found.');
    return <NotFound />;
  }

  if (!verifyDealIsCorrect(deal)) {
    console.error('Deal behind honoredDeal is incorrect.');
    return <NotFound />;
  }

  const dealSupplier = await contentApi
    .getContentItemById20({
      id: deal.properties!.supplier!.id!,
    })
    .catch(catchApiError)
    .then((supplier) => supplier as UmbracoSupplier);

  if (!dealSupplier) {
    console.error('Supplier behind deal not found.');
    return <NotFound />;
  }

  if (!verifySupplierIsCorrect(dealSupplier)) {
    console.error('Supplier behind deal is incorrect.');
    return <NotFound />;
  }

  const primaryImage = deal.properties?.pictures?.[0]?.url;
  const supplierImage = dealSupplier.properties?.picture?.[0]?.url;
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

  return (
    <div className="mx-auto mb-40 flex w-full flex-col items-center px-4 lg:max-w-5xl">
      <div className="flex w-full flex-col rounded-large bg-default-100 p-4 lg:p-10">
        <div className="mb-4 flex flex-row items-center gap-4 border-b border-gray-200 pb-4">
          <AldiButton
            href="/profile/orders"
            variant="ghost"
            isIconOnly={true}
            size="lg"
            as={NextLink}
          >
            <IconArrowLeft />
          </AldiButton>
          <span className="text-lg text-secondary">Zurück zu Meine Deals</span>
        </div>
        <div className="grid grid-cols-5 gap-8">
          <div
            className="col-span-2 min-h-72 overflow-hidden rounded-[20px] bg-cover bg-center"
            style={{
              backgroundImage: productImageUrl && `url(${productImageUrl})`,
            }}
          />
          <div className="col-span-3 flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[20px] bg-gray-200">
                <Image
                  src={supplierImageUrl!}
                  alt={dealSupplier.name}
                  width={88}
                  height={88}
                  objectFit="contain"
                  className="shrink-0"
                />
              </div>
              <h2 className="text-lg font-medium text-secondary">
                {deal.name}
              </h2>
            </div>
            <div>
              <CodeField code={matchingHonoredDeal.code || ''} />
            </div>
            <div className="border-y border-gray-200 py-4 text-secondary/50">
              Gültig ab:{' '}
              {promotionStart.isValid
                ? promotionStart.toLocaleString(DateTime.DATE_SHORT)
                : 'unbekannt'}{' '}
              - Gültig bis:{' '}
              {promotionEnd.isValid
                ? promotionEnd.toLocaleString(DateTime.DATE_SHORT)
                : 'unbekannt'}
            </div>
            <div className="flex flex-row gap-4">
              <AldiButton
                variant="solid"
                color="secondary"
                endContent={<ArrowUpRightSvg />}
                size="lg"
              >
                Beim Partner anwenden
              </AldiButton>
              <AldiButton variant="ghost" color="secondary" size="lg">
                Im Profil ansehen
              </AldiButton>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-6 border-y border-gray-200 p-4 text-lg text-secondary">
          <p>Du brauchst Hilfe? Unser Kundenservice hilft dir gerne!</p>
          <div className="flex flex-row gap-4">
            <Link
              href="mailto:kontakt@kundenservice.aldi-sued.de"
              size="lg"
              color="secondary"
              underline="always"
            >
              <EmailSvg />
              <span className="ml-2 font-medium">
                kontakt@kundenservice.aldi-sued.de
              </span>
            </Link>
            <Link
              href="/faq"
              size="lg"
              color="secondary"
              underline="always"
              as={NextLink}
            >
              <InfoSquareSvg />
              <span className="ml-2 font-medium">Häufig gestellte Fragen</span>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-secondary">Beschreibung</h1>
          <p className="mt-6 text-secondary/50">
            {deal.properties?.description || 'Keine Beschreibung vorhanden'}
          </p>
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-secondary">Einlösen</h1>
          <p className="mt-6 text-secondary/50">
            Dieser Text existiert noch nicht im Backend, daher steht hier ein
            Platzhalter bis die Entwicklung hierzu weiter macht.
          </p>
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-secondary">Rechtliches</h1>
          <p className="mt-6 text-secondary/50">
            Dieser Text existiert noch nicht im Backend, daher steht hier ein
            Platzhalter bis die Entwicklung hierzu weiter macht.
          </p>
        </div>
      </div>
    </div>
  );
}
