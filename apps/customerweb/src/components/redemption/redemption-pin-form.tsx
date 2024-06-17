'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody } from '@nextui-org/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { AldiButton } from 'src/components/nextui/aldi-button';
import { addHonoredDeal } from '@/app/redemption/actions/redeem-action';
import { AldiInput } from '@/components/nextui/aldi-input';

interface RedemptionPinFormProps {
  userEmail: string;
  isGuest?: boolean;
}

export function RedemptionPinForm({
  userEmail,
  isGuest = false,
}: RedemptionPinFormProps) {
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
  } = form;
  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      try {
        const result = await addHonoredDeal({
          pin: data.pinCode,
          email: isGuest ? data.email : userEmail,
        });

        if (result.success) {
          router.push('/redemption/activate');
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error submitting the form', error);
      }
    },
    [router],
  );

  return (
    <Card className=" bg-gray-100 py-4 md:p-8">
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
                required: true,
              }}
              render={({ field }) => (
                <AldiInput
                  className="w-full"
                  label="PIN eingeben"
                  isRequired={true}
                  {...field}
                  isInvalid={!!errors.pinCode}
                  errorMessage={errors.pinCode && 'Pin wird benötigt'}
                />
              )}
            />
            {guest && (
              <Controller
                name="e-mail"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <AldiInput
                    className="w-full"
                    label="E-Mail"
                    type="email"
                    isRequired={true}
                    {...field}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email && 'Pin wird benötigt'}
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
  );
}
