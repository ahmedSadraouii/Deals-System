'use client';

import { useCallback } from 'react';
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AldiCard } from '../nextui/aldi-card';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { AldiButton } from 'src/components/nextui/aldi-button';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from 'src/components/umbraco-cms/umbraco-types';
import { redeemVoucher } from '@/app/redeem/actions/redeem.action';

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
        router.push(
          `/redeem/thankyou/${isLoggedIn ? result.honoredDealId : deal.id}`,
        );
      } else {
        console.error('Failed to activate the voucher', result.message);
      }
    } catch (error) {
      console.error('Error activating the voucher', error);
    }
  }, [pinCode, email, deal, router, session]);

  const supplierImage = supplier.properties?.picture?.[0]?.url;
  const supplierImageUrl =
    supplierImage &&
    defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}${supplierImage}`,
      width: 256,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
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
            <Image
              src={supplierImageUrl!}
              alt={supplier.name}
              width={85}
              height={85}
            />
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
