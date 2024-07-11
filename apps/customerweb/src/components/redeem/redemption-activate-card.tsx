'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { redeemVoucher } from '@/app/(aldi-deals)/redeem/actions/redeem.action';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCard } from '@/components/nextui/aldi-card';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';
import { trackVoucherSubmit } from '@/utils/tracking';

interface CardActivationProps {
  deal: UmbracoDeal;
  supplier: UmbracoSupplier;
  email: string;
  pinCode: string;
}

export default function CardActivation({
  deal,
  supplier,
  email,
  pinCode,
}: CardActivationProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleActivate = useCallback(async () => {
    try {
      const isLoggedIn = !!session?.user;
      const params = isLoggedIn ? { pin: pinCode } : { pin: pinCode, email };

      const result = await redeemVoucher(params);
      if (result.success) {
        trackVoucherSubmit(deal.name, supplier.name);
        router.push(
          `/redeem/thankyou/${isLoggedIn ? result.honoredDealId : deal.id}`,
        );
      } else {
        console.error('Failed to activate the voucher', result.message);
      }
    } catch (error) {
      console.error('Error activating the voucher', error);
    }
  }, [pinCode, email, deal, router, session, supplier]);

  const supplierImage =
    supplier.properties?.picture?.[0]?.url &&
    fixUmbracoMediaLink(supplier.properties?.picture?.[0]?.url);
  return (
    <AldiCard>
      <CardHeader className="flex justify-center border-b pb-4 pt-6">
        <h1 className="text-lg text-secondary">Aktiviere deine Deal(s):</h1>
      </CardHeader>
      <CardBody>
        <div
          key={deal.id}
          className="flex flex-col items-center gap-4 md:flex-row md:px-4"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white p-2">
            {supplierImage && (
              <Image
                src={supplierImage}
                alt={supplier.name}
                width={80}
                height={80}
              />
            )}
          </div>
          <h1 className="text-lg font-bold text-aldi-blue md:w-[40%] ">
            {deal.name}
          </h1>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center border-t pb-8 pt-8">
        <AldiButton
          className="w-full md:w-48"
          size="lg"
          variant="solid"
          color="secondary"
          onClick={handleActivate}
        >
          Deal aktivieren
        </AldiButton>
      </CardFooter>
    </AldiCard>
  );
}
