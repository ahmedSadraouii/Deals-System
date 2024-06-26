'use client';

import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { ZonedDateTime } from '@internationalized/date';
import { now } from '@internationalized/date';
import { Link, SelectItem } from '@nextui-org/react';
import type { CheckoutInputModel } from 'api-deals';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AuthTabs } from '@/app/auth/auth-tabs';
import { cartCheckoutAction } from '@/app/cart/actions/cart-checkout.action';
import { CartStepIndicator } from '@/app/cart/components/cart-step-indicator';
import { CheckoutCostOverview } from '@/app/cart/components/checkout-cost-overview';
import { SessionLoading } from '@/app/cart/components/session-loading';
import { useCart } from '@/app/contexts/cart/use-cart';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';
import { AldiDatePicker } from '@/components/nextui/aldi-date-picker';
import { AldiInput } from '@/components/nextui/aldi-input';
import { AldiSelect } from '@/components/nextui/aldi-select';
import { PaymentIconMastercard } from '@/components/svg/payment-icon-mastercard';
import { PaymentIconVisa } from '@/components/svg/payment-icon-visa';
import { ApiErrorCodes } from '@/utils/api-response-handling';
import { emailRegex } from '@/utils/email-regex';
import { toast } from '@/utils/toast';

export type CheckoutPageAddressForm = Partial<
  Omit<CheckoutInputModel, 'dateOfBirth'>
> & {
  email?: string;
  dateOfBirth?: ZonedDateTime;
  countryCode?: string;
};

export interface CheckoutPageProps {
  defaultFormValues?: CheckoutPageAddressForm;
}
export function CheckoutPage({ defaultFormValues }: CheckoutPageProps) {
  const { cartContext } = useCart();
  const session = useSession();
  const searchParams = useSearchParams();

  const [isLoading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<ApiErrorCodes | null>(
    null,
  );

  const defaultValues: Required<CheckoutPageAddressForm> = {
    email: defaultFormValues?.email || '',
    firstName: defaultFormValues?.firstName || '',
    lastName: defaultFormValues?.lastName || '',
    postalCode: defaultFormValues?.postalCode || '',
    houseNumber: defaultFormValues?.houseNumber || '',
    street: defaultFormValues?.street || '',
    dateOfBirth: defaultFormValues?.dateOfBirth || now('Europe/Berlin'),
    city: '',
    countryCode: 'DE',
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
    getValues,
    trigger,
  } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    setLoading(true);

    try {
      const checkoutResponse = await cartCheckoutAction({
        ...data,
        dateOfBirth: data.dateOfBirth?.toDate()?.toISOString() || '',
      });
      if (!checkoutResponse.redirectUrl) {
        toast({
          title: 'Fehler',
          description: 'Der Checkout konnte nicht gestartet werden (1).',
        });
      } else {
        window.location.href = checkoutResponse.redirectUrl;
      }
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: 'Der Checkout konnte nicht gestartet werden (2).',
      });
      setResponseError(ApiErrorCodes.UNKNOWN);
      setLoading(false);
    }
  }, []);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  const isGuestOrder = searchParams.get('type') === 'guest';

  if (!cartContext.cart) {
    return null;
  }

  if (session.status === 'loading') {
    return <SessionLoading />;
  }

  if (session.status === 'unauthenticated' && !isGuestOrder) {
    return (
      <div className="flex w-full flex-col items-center py-20">
        <AuthTabs />
        <div className="mt-10 flex w-full max-w-[600px] flex-row justify-center border-y border-secondary/10 py-6">
          <Link
            href="/cart/checkout?type=guest"
            size="lg"
            color="secondary"
            underline="always"
          >
            Als Gast bestellen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <CartStepIndicator step={2} />
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-20 grid grid-cols-2 gap-10">
            <div>
              <div className="flex flex-col gap-10">
                <div className="rounded-[20px] bg-neutral-100 p-10">
                  <h1 className="mb-6 text-3xl font-bold text-secondary">
                    Rechnungs- und Lieferadresse
                  </h1>
                  <div className="flex flex-col gap-6">
                    <div className="grid w-full grid-cols-2 gap-4">
                      <Controller
                        render={({ field }) => (
                          <AldiInput
                            placeholder="Vorname*"
                            isRequired={true}
                            isInvalid={!!errors.firstName}
                            errorMessage={
                              errors.firstName && 'Vorname wird benötigt'
                            }
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
                            errorMessage={
                              errors.lastName && 'Nachname wird benötigt'
                            }
                            {...field}
                          />
                        )}
                        name="lastName"
                        rules={{ required: true }}
                      />
                    </div>

                    <Controller
                      name="dateOfBirth"
                      render={({ field }) => (
                        <AldiDatePicker
                          className="col-span-4"
                          granularity="day"
                          isInvalid={!!errors.dateOfBirth}
                          errorMessage={
                            errors.dateOfBirth && 'Geburtsdatum wird benötigt'
                          }
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      render={({ field }) => (
                        <AldiSelect
                          selectedKeys={[field.value]}
                          defaultSelectedKeys={['DE']}
                          {...field}
                        >
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
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

                    <div className="grid w-full grid-cols-4 gap-4">
                      <Controller
                        render={({ field }) => (
                          <AldiInput
                            className="col-span-3"
                            placeholder="Straße*"
                            isRequired={true}
                            isInvalid={!!errors.street}
                            errorMessage={
                              errors.street && 'Straße wird benötigt'
                            }
                            {...field}
                          />
                        )}
                        name="street"
                        rules={{ required: true }}
                      />
                      <Controller
                        render={({ field }) => (
                          <AldiInput
                            placeholder="Hausnr.*"
                            isRequired={true}
                            isInvalid={!!errors.houseNumber}
                            errorMessage={
                              errors.houseNumber && 'Hausnummer wird benötigt'
                            }
                            {...field}
                          />
                        )}
                        name="houseNumber"
                        rules={{ required: true }}
                      />
                    </div>

                    <div className="grid w-full grid-cols-4 gap-4">
                      <Controller
                        render={({ field }) => (
                          <AldiInput
                            className="col-span-3"
                            placeholder="Stadt*"
                            isRequired={true}
                            isInvalid={!!errors.city}
                            errorMessage={errors.city && 'Stadt wird benötigt'}
                            {...field}
                          />
                        )}
                        name="city"
                        rules={{ required: true }}
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
                              return /^\d{4}\s[A-Za-z]{2}$/.test(
                                value.toString(),
                              );
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
                    </div>

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
                              allowedErrors={[
                                ApiErrorCodes.EMAIL_ALREADY_IN_USE,
                              ]}
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
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-[20px] bg-neutral-100 p-10">
                  <p className="mb-6 border-b border-b-neutral-200 pb-6 text-center text-secondary">
                    Als nächstes wirst du zum Bezahlungsprozess weitergeleitet.
                    Dort kannst du deine bevorzugte Zahlungsmethode auswählen
                    und den Kauf abschließen.
                  </p>
                  <h2 className="mb-5 text-lg font-medium text-secondary">
                    Wir unterstützen folgende Zahlungsmethoden
                  </h2>
                  <div className="flex flex-row gap-6">
                    <PaymentIconMastercard />
                    <PaymentIconVisa />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[20px] bg-neutral-100 p-10">
                <CheckoutCostOverview />

                <div className="flex flex-col gap-4">
                  <Controller
                    render={({ field }) => (
                      <AldiCheckbox isSelected={field.value} {...field}>
                        <p className="text-sm">
                          Ja, ich möchte den Newsletter erhalten und akzeptiere
                          die Datenschutzrichtlinie sowie die
                          Nutzungsbedingungen.
                        </p>
                      </AldiCheckbox>
                    )}
                    name="newsletterChecked"
                  />

                  <AldiButton
                    variant="solid"
                    color="secondary"
                    fullWidth={true}
                    size="lg"
                    onClick={onClickProceed}
                    isLoading={isLoading}
                    href="/cart/checkout"
                  >
                    Jetzt kostenpflichtig abschliessen
                  </AldiButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
