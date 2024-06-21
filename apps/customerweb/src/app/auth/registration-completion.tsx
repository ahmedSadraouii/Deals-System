'use client';

import { useCallback, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { registrationCompletionAction } from '@/app/auth/actions/registration-completion.action';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';
import { ApiErrorCodes } from '@/utils/api-response-handling';

export function RegistrationCompletion() {
  const [isValidationRequired, setValidationRequired] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('login-credentials')) {
      setValidationRequired(false);
    }
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<ApiErrorCodes | null>(
    null,
  );

  const defaultValues = {
    newsletterChecked: false,
  };

  const form = useForm({
    defaultValues,
  });
  const { handleSubmit, formState, setValue, trigger } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    setLoading(true);

    const credentials = sessionStorage.getItem('login-credentials');
    if (!credentials) {
      setResponseError(ApiErrorCodes.UNKNOWN);
      setLoading(false);
      return;
    }

    const { email, password } = JSON.parse(credentials);

    try {
      // do this and that
      const returnValue = await registrationCompletionAction({
        email,
        password,
        newsletterAccepted: data.newsletterChecked,
      });

      if (returnValue.success) {
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
        });
      } else {
        setResponseError(returnValue.apiErrorCode || ApiErrorCodes.UNKNOWN);
        setLoading(false);
      }
    } catch (error: any) {
      setResponseError(ApiErrorCodes.UNKNOWN);
      setLoading(false);
    }
  }, []);

  const onCheckAllAndProceed = useCallback(() => {
    setValue('newsletterChecked', true);
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, setValue]);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  if (!isValidationRequired) {
    return redirect('/auth');
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" className="mb-5" />
          <h1 className="mb-2 text-3xl font-bold text-secondary">
            Herzlich Willkommen!
          </h1>
          <p className="mb-10 text-center text-lg text-secondary/50">
            Schön, dass du dich mit deinem ALDI SPORTS Account anmelden
            möchtest. Bestätige noch bitte folgende Hinweise und du bist
            startklar!
          </p>

          {responseError && (
            <p className="text-center text-red-500">
              <ApiErrorTranslation apiError={responseError} />
            </p>
          )}

          <div className="mb-4 flex flex-col gap-6">
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
          </div>

          <p className="mb-10 self-start text-sm text-secondary/50">
            * Pflichtfeld
          </p>

          <div className="flex w-full flex-col gap-6">
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
  );
}
