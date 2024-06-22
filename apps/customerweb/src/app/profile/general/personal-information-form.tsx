'use client';

import React, { useCallback, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { Link } from '@nextui-org/react';
import type { UserDetailsDto } from 'api-user';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { updateProfileInformationAction } from '@/app/profile/actions/update-profile-information.action';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiDatePicker } from '@/components/nextui/aldi-date-picker';
import { AldiInput } from '@/components/nextui/aldi-input';
import { IconProfile } from '@/components/svg/icon-profile';

export interface PersonalInformationFormProps {
  initialFormValues: UserDetailsDto;
}

export function PersonalInformationForm({
  initialFormValues,
}: PersonalInformationFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const session = useSession({ required: true });

  const _initialFormValues = {
    ...initialFormValues,
    dateOfBirth: !!initialFormValues.dateOfBirth
      ? fromDate(initialFormValues.dateOfBirth, getLocalTimeZone())
      : undefined,
  };

  const form = useForm({
    defaultValues: _initialFormValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(
    async (data: typeof _initialFormValues) => {
      setIsSaving(true);
      const response = await updateProfileInformationAction({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        addressStreet: data.addressStreet,
        addressCity: data.addressCity,
        addressHouseNumber: data.addressHouseNumber,
        dateOfBirth: data.dateOfBirth?.toDate()?.toISOString() || '',
      });

      await session.update();

      if (!response.success) {
        console.error(
          'Failed to update profile information',
          response.message,
          response,
        );
      }
      setIsSaving(false);
    },
    [session],
  );

  const onClickSignOut = useCallback(async () => {
    await signOut({
      redirect: true,
    });
  }, []);

  if (!session.data) return null;

  return (
    <div className="mx-auto mb-40 flex w-full flex-col items-center px-4 lg:max-w-xl">
      <div className="flex w-full flex-col space-y-6 divide-y rounded-large bg-default-100 p-4 lg:p-10">
        <div className="flex flex-row items-center gap-4 text-secondary">
          <div className="shrink-0 items-center rounded-full border border-secondary/10 bg-white p-5">
            <IconProfile className="text-3xl" />
          </div>
          <div className="flex flex-col leading-snug">
            <h2 className="text-3xl font-bold">
              {session.data.user.profile.firstName}{' '}
              {session.data.user.profile.lastName}
            </h2>
          </div>
        </div>
        <div className="pt-6">
          <h1 className="mb-6 text-3xl font-bold text-secondary">
            Persönliche Informationen
          </h1>
          <FormProvider {...form}>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 grid grid-cols-4 gap-4">
                <Controller
                  name="firstName"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <AldiInput
                      className="col-span-2"
                      label="Vorname"
                      isRequired={true}
                      {...field}
                      isInvalid={!!errors.firstName}
                      errorMessage={errors.firstName && 'Vorname wird benötigt'}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <AldiInput
                      className="col-span-2"
                      label="Nachname"
                      isRequired={true}
                      {...field}
                      isInvalid={!!errors.lastName}
                      errorMessage={errors.lastName && 'Nachname wird benötigt'}
                    />
                  )}
                />

                <AldiInput
                  className="col-span-4"
                  label="E-Mail Adresse"
                  value={String(session.data.user.profile.email)}
                  readOnly={true}
                />

                <Controller
                  name="dateOfBirth"
                  render={({ field }) => (
                    <AldiDatePicker
                      className="col-span-4"
                      label="Geburtstag"
                      granularity="day"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="addressStreet"
                  render={({ field }) => (
                    <AldiInput
                      className="col-span-3"
                      label="Straße"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="addressHouseNumber"
                  render={({ field }) => (
                    <AldiInput
                      className="col-span-1"
                      label="Hausnummer"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="addressCity"
                  render={({ field }) => (
                    <AldiInput
                      className="col-span-2"
                      label="Stadt"
                      {...field}
                    />
                  )}
                />

                <AldiInput
                  className="col-span-2"
                  label="PLZ"
                  value={String(session.data.user.profile.addressPostalCode)}
                  readOnly={true}
                />
              </div>
              <AldiButton
                type="submit"
                variant="solid"
                color="secondary"
                fullWidth={true}
                isLoading={isSaving}
              >
                Speichern
              </AldiButton>
            </form>
          </FormProvider>
        </div>
      </div>

      <Link
        href="#"
        onClick={onClickSignOut}
        size="lg"
        color="secondary"
        underline="always"
        className="mt-10 hidden lg:block"
      >
        Ausloggen
      </Link>
    </div>
  );
}
