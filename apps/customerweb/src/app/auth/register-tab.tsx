'use client';

import { useCallback } from 'react';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';
import { AldiInput } from '@/components/nextui/aldi-input';
import { AldiPasswordInput } from '@/components/nextui/aldi-password-input';
import { IconCircleCheck } from '@/components/svg/icon-circle-check';
import { emailRegex } from '@/utils/email-regex';

export interface RegisterTabProps {
  onSwitchToLogin: () => void;
}

export function RegisterTab({ onSwitchToLogin }: RegisterTabProps) {
  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    postalCode: '',
    password: '',
    termsChecked: false,
    newsletterChecked: false,
  };

  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    console.log(data);
  }, []);

  const onCheckAllAndProceed = useCallback(() => {
    setValue('termsChecked', true);
    setValue('newsletterChecked', true);
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, setValue]);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-secondary/50 flex flex-row items-center justify-center gap-2">
        <span>Du besitzt ein</span>
        <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" />
        <span>
          Konto? Melde dich mit deinen Accountdaten{' '}
          <Link
            className="pointer-events-auto cursor-pointer"
            onClick={onSwitchToLogin}
            color="secondary"
            underline="always"
          >
            hier
          </Link>{' '}
          an.
        </span>
      </p>
      <div className="flex flex-row gap-12">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-default-100 rounded-large flex w-[600px] flex-col gap-6 border p-10">
              <Controller
                render={({ field }) => (
                  <AldiInput
                    type="email"
                    placeholder="E-Mail Adresse*"
                    isRequired={true}
                    isInvalid={!!errors.email}
                    errorMessage={
                      errors.email &&
                      'Eine korrekte E-Mail Adresse wird benötigt'
                    }
                    {...field}
                  />
                )}
                name="email"
                rules={{
                  required: true,
                  validate: (value) => emailRegex.test(value),
                }}
              />
              <div className="grid w-full grid-cols-2 gap-4">
                <Controller
                  render={({ field }) => (
                    <AldiInput
                      placeholder="Vorname*"
                      isRequired={true}
                      isInvalid={!!errors.firstName}
                      errorMessage={errors.firstName && 'Vorname wird benötigt'}
                      {...field}
                    />
                  )}
                  name="firstName"
                  rules={{ required: true }}
                />

                <Controller
                  render={({ field }) => (
                    <AldiInput
                      placeholder="Nachname*"
                      isRequired={true}
                      isInvalid={!!errors.lastName}
                      errorMessage={errors.lastName && 'Nachname wird benötigt'}
                      {...field}
                    />
                  )}
                  name="lastName"
                  rules={{ required: true }}
                />
              </div>

              <Controller
                render={({ field }) => (
                  <AldiInput
                    type="number"
                    placeholder="PLZ*"
                    isRequired={true}
                    isInvalid={!!errors.postalCode}
                    errorMessage={
                      errors.postalCode && 'Postleitzahl wird benötigt'
                    }
                    {...field}
                  />
                )}
                name="postalCode"
                rules={{
                  required: true,
                  validate: (value) => value.toString().length === 5,
                }}
              />
              <Controller
                render={({ field }) => (
                  <AldiPasswordInput
                    placeholder="Passwort*"
                    isRequired={true}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password && 'Password wird benötigt'}
                    {...field}
                  />
                )}
                name="password"
                rules={{ required: true }}
              />

              <Controller
                render={({ field }) => (
                  <AldiCheckbox
                    isRequired={true}
                    isInvalid={!!errors.termsChecked}
                    isSelected={field.value}
                    {...field}
                  >
                    <p className="text-sm">
                      Durch das Absenden dieses Formulars stimme ich den{' '}
                      <Link
                        as={NextLink}
                        isExternal={true}
                        className="text-sm"
                        href="/cms/privacy-policy"
                        color="secondary"
                        underline="always"
                      >
                        Datenschutzbestimmungen
                      </Link>{' '}
                      und{' '}
                      <Link
                        as={NextLink}
                        isExternal={true}
                        className="text-sm"
                        href="/cms/terms-of-service"
                        color="secondary"
                        underline="always"
                      >
                        Nutzungsbedingungen
                      </Link>{' '}
                      zu.*
                    </p>
                  </AldiCheckbox>
                )}
                name="termsChecked"
                rules={{ required: true, validate: (value) => value === true }}
              />
              <Controller
                render={({ field }) => (
                  <AldiCheckbox isSelected={field.value} {...field}>
                    <p className="text-sm">
                      Ja, ich möchte den Newsletter erhalten und akzeptiere die
                      Datenschutzrichtlinie sowie die Nutzungsbedingungen.
                    </p>
                  </AldiCheckbox>
                )}
                name="newsletterChecked"
              />
              <div className="mt-12 flex flex-col gap-6">
                <AldiButton
                  onClick={onCheckAllAndProceed}
                  variant="solid"
                  color="secondary"
                  fullWidth={true}
                >
                  Alle bestätigen und registrieren
                </AldiButton>
                <AldiButton
                  onClick={onClickProceed}
                  variant="ghost"
                  color="secondary"
                  fullWidth={true}
                >
                  Auswahl bestätigen und registrieren
                </AldiButton>
              </div>
            </div>
          </form>
        </FormProvider>

        <div className="rounded-large flex w-[680px] items-end overflow-hidden bg-[url('/login-image.png')] bg-cover p-10">
          <div className="bg-aldi-key rounded-large w-full p-10 text-white">
            <h2 className="mb-4 text-2xl font-medium">
              Deine Vorteile deines Accounts im Überblick!
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-row items-center gap-2  tracking-wide">
                <IconCircleCheck className="text-2xl" />
                <span>Kostenlos, unverbindlich und jederzeit löschbar!</span>
              </li>
              <li className="flex flex-row items-center gap-2  tracking-wide">
                <IconCircleCheck className="text-2xl" />
                <span>Einlösen deiner Offline Deals!</span>
              </li>
              <li className="flex flex-row items-center gap-2  tracking-wide">
                <IconCircleCheck className="text-2xl" />
                <span>
                  Neue Angebote, Sonderaktionen und Deals nie mehr verpassen!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
