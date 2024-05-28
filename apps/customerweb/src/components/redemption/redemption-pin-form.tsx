'use client';

import { useCallback } from 'react';
import { AldiButton } from '../nextui/aldi-button';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { AldiInput } from '@/components/nextui/aldi-input';

export function RedemptionPinForm() {
  const defaultValues = {
    pinCode: '',
  };
  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    console.log(data);
  }, []);

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
