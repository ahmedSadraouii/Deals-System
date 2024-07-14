'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RedemptionSteps } from './redemption-steps';
import { Link } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { AuthTabs } from '@/app/(aldi-deals)/auth/auth-tabs';
import { getVoucherInfo } from '@/app/(aldi-deals)/redeem/actions/get-voucher-info.action';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { trackPageView } from '@/utils/tracking';

interface RedeemPageProps {
  isGuest: boolean;
}

export function RedeemPage({ isGuest }: RedeemPageProps) {
  const hasTrackedPageView = useRef(false);
  const searchParams = useSearchParams();
  const session = useSession();
  const router = useRouter();
  const defaultValues = {
    pinCode: '',
    email: '',
  };
  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      try {
        const result = await getVoucherInfo({ pin: data.pinCode });
        if (result.success) {
          if (result.state === 'available') {
            const emailParam = isGuest
              ? `&email=${encodeURIComponent(data.email)}`
              : '';
            const url = `/redeem/activate/${
              result.dealId
            }?pinCode=${encodeURIComponent(data.pinCode)}${emailParam}`;
            router.push(url);
          } else if (result.state === 'redeemed') {
            setError('pinCode', {
              type: 'manual',
              message: 'Dieser PIN wurde bereits eingelöst.',
            });
          }
        } else {
          setError('pinCode', {
            type: 'manual',
            message: result.message,
          });
        }
      } catch (error) {
        console.error('Error submitting the form', error);
      }
    },
    [router, setError, isGuest],
  );

  const pageInfo = {
    pageName: 'aldi-deals-redeem',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'redeem',
  };
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, []);

  const isGuestOrder = searchParams.get('type') === 'guest';
  console.log('session', session);
  console.log(isGuestOrder);
  if (session.status === 'unauthenticated' && !isGuestOrder) {
    return (
      <div className="flex w-full flex-col items-center py-20">
        <AuthTabs />
        <div className="mt-10 flex w-full max-w-[600px] flex-row justify-center border-y border-secondary/10 py-6">
          <Link
            href="/redeem?type=guest"
            size="lg"
            color="secondary"
            underline="always"
          >
            Als Gast einlösen
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <RedemptionSteps />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="mb-6">
          <h1 className="text-center text-4xl font-bold text-secondary">
            Kassenbon-PIN eingeben
          </h1>
          <p className="text-center text-secondary opacity-50">
            Gib folgend die 16-stellige PIN auf deinem Kassenbon ein.
          </p>
        </div>
        <Card className=" bg-neutral-100 py-4 md:p-8">
          <CardBody>
            <FormProvider {...form}>
              <form
                className="flex flex-col items-center gap-4 md:gap-8"
                id="billing-address-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="pinCode"
                  rules={{
                    required: 'Pin wird benötigt',
                  }}
                  render={({ field }) => (
                    <AldiInput
                      className="w-full"
                      label="PIN eingeben"
                      isRequired={true}
                      {...field}
                      isInvalid={!!errors.pinCode}
                      errorMessage={errors.pinCode?.message}
                    />
                  )}
                />
                {isGuest && (
                  <Controller
                    name="email"
                    rules={{
                      required: 'E-Mail wird benötigt',
                    }}
                    render={({ field }) => (
                      <AldiInput
                        className="w-full"
                        label="E-Mail"
                        type="email"
                        isRequired={true}
                        {...field}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                )}
                <AldiButton
                  size="lg"
                  variant="solid"
                  type="submit"
                  color="secondary"
                >
                  Eingabe bestätigen
                </AldiButton>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
