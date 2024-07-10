import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import NotFound from '@/app/not-found';
import { CodeField } from '@/app/profile/deals/code-field';
import { AldiButton } from '@/components/nextui/aldi-button';
import { EmailSvg } from '@/components/svg/email-svg';
import { IconArrowLeft } from '@/components/svg/icon-arrow-left';
import { InfoSquareSvg } from '@/components/svg/info-square-svg';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { getContentApiClient } from '@/utils/content-api-client';
import { getHonoredDealsApiClient } from '@/utils/deals-api-client';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
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

  const honoredDeal = await honoredDealsApi.getHonoredDeal({ id: id });
  if (!honoredDeal) {
    return <NotFound />;
  }

  const deal = await contentApi
    .getContentItemById20({
      id: honoredDeal.dealId!,
    })
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
    .then((supplier) => supplier as UmbracoSupplier);

  if (!dealSupplier) {
    console.error('Supplier behind deal not found.');
    return <NotFound />;
  }

  if (!verifySupplierIsCorrect(dealSupplier)) {
    console.error('Supplier behind deal is incorrect.');
    return <NotFound />;
  }

  const primaryImage =
    deal.properties?.pictures?.[0]?.url &&
    fixUmbracoMediaLink(deal.properties?.pictures?.[0]?.url);
  const supplierImage =
    dealSupplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(dealSupplier.properties?.picture?.[0]?.url);

  const promotionStart = DateTime.fromISO(deal.properties?.promotionStart!);
  const promotionEnd = DateTime.fromISO(deal.properties?.promotionEnd!);

  return (
    <div className="mx-auto mb-40 flex w-full flex-col items-center px-4 lg:max-w-5xl">
      <div className="flex w-full flex-col rounded-large bg-default-100 p-4 lg:p-10">
        <div className="mb-4 flex flex-row items-center gap-4 border-b border-neutral-200 pb-4">
          <AldiButton
            href="/profile/deals"
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
          {primaryImage && (
            <Image
              className="col-span-5 min-h-72 overflow-hidden rounded-[20px] object-cover object-center lg:col-span-2"
              src={primaryImage}
              alt="Deal Image"
              width={768}
              height={768}
            />
          )}
          <div className="col-span-5 flex flex-col gap-6 lg:col-span-3">
            <div className="flex flex-row items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[20px] bg-neutral-200">
                {supplierImage && (
                  <Image
                    src={supplierImage}
                    alt={dealSupplier.name}
                    width={88}
                    height={88}
                    className="shrink-0 object-contain"
                  />
                )}
              </div>
              <h2 className="text-lg font-medium text-secondary">
                {deal.name}
              </h2>
            </div>
            <div>
              <CodeField code={honoredDeal.code || ''} />
            </div>
            <div className="border-y border-neutral-200 py-4 text-secondary/50">
              Gültig ab:{' '}
              {promotionStart.isValid
                ? promotionStart.toLocaleString(DateTime.DATE_SHORT)
                : 'unbekannt'}{' '}
              - Gültig bis:{' '}
              {promotionEnd.isValid
                ? promotionEnd.toLocaleString(DateTime.DATE_SHORT)
                : 'unbekannt'}
            </div>
            {/*
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
            </div>*/}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-6 border-y border-neutral-200 p-4 text-lg text-secondary">
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
        {/*<div className="mt-4">
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
        </div>*/}
      </div>
    </div>
  );
}
