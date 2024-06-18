'use client';

import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Link, SelectItem } from '@nextui-org/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { registerDealsAction } from '@/app/auth/actions/register-deals.action';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';
import { AldiInput } from '@/components/nextui/aldi-input';
import { AldiPasswordInput } from '@/components/nextui/aldi-password-input';
import { AldiSelect } from '@/components/nextui/aldi-select';
import { IconCircleCheck } from '@/components/svg/icon-circle-check';
import { ApiErrorCodes } from '@/utils/api-response-handling';
import { createQueryString } from '@/utils/create-query-string';
import { emailRegex } from '@/utils/email-regex';
import { validateAldiPassword } from '@/utils/validate-aldi-password';

export interface RegisterTabProps {
  onSwitchToLogin: () => void;
}

export function RegisterTab(props: RegisterTabProps) {
  const [isLoading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<ApiErrorCodes | null>(
    null,
  );

  // const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    postalCode: '',
    password: '',
    countryCode: 'DE',
    termsChecked: false,
    newsletterChecked: false,
  };

  const countries = [
    { value: 'DE', label: 'Deutschland' },
    { value: 'AT', label: 'Österreich' },
    { value: 'CH', label: 'Schweiz' },
    { value: 'NL', label: 'Niederlande' },
    { value: 'BE', label: 'Belgien' },
    { value: 'LU', label: 'Luxemburg' },
    { value: 'FR', label: 'Frankreich' },
  ];

  const form = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = form;

  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      setLoading(true);

      try {
        const returnValue = await registerDealsAction({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          addressPostalCode: data.postalCode,
          password: data.password,
          countryCode: data.countryCode,
          termsAccepted: data.termsChecked,
          newsletterAccepted: data.newsletterChecked,
        });

        if (returnValue.success) {
          router.push(
            `/auth/register-success?${createQueryString({
              email: data.email,
            })}`,
          );
        } else {
          setResponseError(returnValue.apiErrorCode || ApiErrorCodes.UNKNOWN);
          setLoading(false);
        }
      } catch (error: any) {
        setResponseError(ApiErrorCodes.UNKNOWN);
        setLoading(false);
      }
    },
    [router],
  );

  const onCheckAllAndProceed = useCallback(() => {
    setValue('termsChecked', true);
    setValue('newsletterChecked', true);
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, setValue]);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  useEffect(() => {
    const subscription = form.watch(() => setResponseError(null));
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="flex flex-col gap-8">
      <p className="flex flex-row items-center justify-center gap-2 text-secondary/50">
        <span>Du besitzt ein</span>
        <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" />
        <span>
          Konto? Melde dich mit deinen Accountdaten{' '}
          <Link
            className="pointer-events-auto cursor-pointer"
            onClick={props.onSwitchToLogin}
            color="secondary"
            underline="always"
          >
            hier
          </Link>{' '}
          an.
        </span>
      </p>
      <div className="flex flex-col gap-12 lg:flex-row lg:justify-center">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex shrink-0 basis-[600px] flex-col gap-6 rounded-3xl border bg-default-100 p-10">
              <Controller
                render={({ field }) => (
                  <AldiInput
                    type="email"
                    placeholder="E-Mail Adresse*"
                    isRequired={true}
                    isInvalid={
                      !!errors.email ||
                      responseError === ApiErrorCodes.EMAIL_ALREADY_IN_USE
                    }
                    errorMessage={
                      <ApiErrorTranslation
                        errorOverride={
                          errors.email &&
                          'Eine korrekte E-Mail Adresse wird benötigt'
                        }
                        allowedErrors={[ApiErrorCodes.EMAIL_ALREADY_IN_USE]}
                        apiError={responseError}
                      />
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
                  <AldiSelect
                    selectedKeys={[field.value]}
                    defaultSelectedKeys={['DE']}
                    {...field}
                  >
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </AldiSelect>
                )}
                name="countryCode"
                rules={{
                  required: true,
                }}
              />

              <Controller
                render={({ field }) => (
                  <AldiInput
                    placeholder="PLZ*"
                    isRequired={true}
                    isInvalid={!!errors.postalCode}
                    errorMessage={
                      errors.postalCode &&
                      'Die Postleitzahl ist ungültig. Bitte überprüfe deine Eingabe.'
                    }
                    {...field}
                  />
                )}
                name="postalCode"
                rules={{
                  required: true,
                  validate: (value) => {
                    const code = getValues('countryCode');

                    if (code === 'FR') {
                      return /^\d{4}\s[A-Za-z]{2}$/.test(value.toString());
                    } else if (code === 'DE' || code === 'FR') {
                      return /^\d{5}$/.test(value.toString());
                    } else if (
                      code === 'LU' ||
                      code === 'BE' ||
                      code === 'CH' ||
                      code === 'AT'
                    ) {
                      return /^\d{4}$/.test(value.toString());
                    }

                    // at least something...
                    return !!code;
                  },
                }}
              />

              <Controller
                render={({ field }) => (
                  <AldiPasswordInput
                    placeholder="Passwort*"
                    isRequired={true}
                    isInvalid={
                      !!errors.password ||
                      responseError === ApiErrorCodes.PASSWORD_INVALID ||
                      responseError === ApiErrorCodes.PASSWORD_LENGTH_MISMATCH
                    }
                    errorMessage={
                      <ApiErrorTranslation
                        errorOverride={
                          errors.password?.message ||
                          (errors.password && 'Passwort wird benötigt')
                        }
                        allowedErrors={[
                          ApiErrorCodes.PASSWORD_INVALID,
                          ApiErrorCodes.PASSWORD_LENGTH_MISMATCH,
                        ]}
                        apiError={responseError}
                      />
                    }
                    {...field}
                  />
                )}
                name="password"
                rules={{ required: true, validate: validateAldiPassword }}
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
                  isLoading={isLoading}
                >
                  Alle bestätigen und registrieren
                </AldiButton>
                <AldiButton
                  onClick={onClickProceed}
                  variant="ghost"
                  color="secondary"
                  fullWidth={true}
                  isLoading={isLoading}
                >
                  Auswahl bestätigen und registrieren
                </AldiButton>
              </div>
            </div>
          </form>
        </FormProvider>

        <div className="flex basis-[680px] items-end overflow-hidden rounded-3xl bg-[url('/login-image.png')] bg-cover p-10">
          <div className="w-full rounded-3xl bg-aldi-key p-10 text-white">
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
