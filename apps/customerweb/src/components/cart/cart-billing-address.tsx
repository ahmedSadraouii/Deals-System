'use client';

import { useCallback } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { AldiInput } from '@/components/nextui/aldi-input';

export function BillingAddress() {
  const defaultValues = {
    firstName: '',
    lastName: '',
    postalCode: '',
    birthDate: '',
    city: '',
    street: '',
    hausnr: '',
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
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  ); // Calculate date 18 years ago
  return (
    <Card className=" bg-gray-100 ">
      <CardHeader>
        <h1 className="pl-5 text-2xl font-bold leading-10 ">
          Rechnungsadresse
        </h1>
      </CardHeader>
      <CardBody>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Controller
                name="firstName"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <AldiInput
                    label="Vorname"
                    isRequired={true}
                    {...field}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName && 'Vorname wird benötigt'}
                  />
                )}
              />
              <Controller
                render={({ field }) => (
                  <AldiInput
                    label="Nachname"
                    isRequired={true}
                    {...field}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName && 'Nachname wird benötigt'}
                  />
                )}
                name="lastName"
                rules={{ required: true }}
              />
            </div>
            <Controller
              name="birthDate"
              rules={{
                required: true,
                validate: {
                  validDate: (value) => value && new Date(value) <= minDate,
                },
              }}
              render={({ field }) => (
                <AldiInput
                  type="date"
                  label="Geburtsdatum"
                  isInvalid={!!errors.birthDate}
                  isRequired={true}
                  {...field}
                  errorMessage={
                    errors.birthDate &&
                    'Du bist zu jung! Leider kannst du diesen Deal nur erwerben wenn du älter als 18 bist.'
                  }
                />
              )}
            />
            <div className="jusify-center flex items-center gap-4 md:hidden">
              <Controller
                name="postalCode"
                rules={{ required: true, pattern: /^[0-9]{5}$/ }}
                render={({ field }) => (
                  <AldiInput
                    type="number"
                    isInvalid={!!errors.postalCode}
                    isRequired={true}
                    label="PLZ"
                    {...field}
                    errorMessage={
                      errors.postalCode &&
                      'Die Postleitzahl muss aus 5 Ziffern bestehen. Bitte überprüfe deine Eingabe.'
                    }
                  />
                )}
              />
              <Controller
                name="hausnr"
                rules={{ required: true }}
                render={({ field }) => (
                  <AldiInput
                    type="number"
                    isInvalid={!!errors.hausnr}
                    isRequired={true}
                    label="Hausnr."
                    {...field}
                    errorMessage={errors.hausnr && 'Hausnr. wird benötigt'}
                  />
                )}
              />
            </div>
            <div className="flex gap-4">
              <Controller
                name="city"
                rules={{ required: true }}
                render={({ field }) => (
                  <AldiInput
                    className="w-full md:w-[80%]"
                    isRequired={true}
                    isInvalid={!!errors.city}
                    label="Stadt"
                    {...field}
                    errorMessage={errors.city && 'Stadt wird benötigt'}
                  />
                )}
              />
              <Controller
                name="postalCode"
                rules={{ required: true, pattern: /^[0-9]{5}$/ }}
                render={({ field }) => (
                  <AldiInput
                    className="hidden md:block md:w-[20%]"
                    isRequired={true}
                    isInvalid={!!errors.postalCode}
                    label="PLZ"
                    {...field}
                    errorMessage={
                      errors.postalCode &&
                      'Die Postleitzahl muss aus 5 Ziffern bestehen. Bitte überprüfe deine Eingabe.'
                    }
                  />
                )}
              />
            </div>
            <div className="flex gap-4">
              <Controller
                name="street"
                rules={{ required: true }}
                render={({ field }) => (
                  <AldiInput
                    className="w-full md:w-[80%]"
                    isRequired={true}
                    isInvalid={!!errors.street}
                    label="Straße"
                    {...field}
                    errorMessage={errors.street && 'Straße wird benötigt'}
                  />
                )}
              />
              <Controller
                name="hausnr"
                rules={{ required: true }}
                render={({ field }) => (
                  <AldiInput
                    className="hidden md:block md:w-[20%]"
                    isRequired={true}
                    isInvalid={!!errors.hausnr}
                    label="Hausnr"
                    {...field}
                    errorMessage={errors.hausnr && 'Hausnr. wird benötigt'}
                  />
                )}
              />
            </div>
            <p>*Pflichtfeld</p>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}
