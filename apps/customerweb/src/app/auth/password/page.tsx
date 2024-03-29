'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { emailRegex } from '@/utils/email-regex';

function Page() {
  const searchParams = useSearchParams();

  const defaultValues = {
    email: '',
  };

  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    await signIn('credentials', {
      email: data.email,
      callbackUrl: '/',
    });
  }, []);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <div className="text-center">
      <h1 className="mb-20 text-5xl font-bold text-secondary">
        Setze jetzt deine Passwort zurück.
      </h1>

      <div className="flex flex-col gap-8">
        <p>
          Du weißt dein Passwort? Melde dich mit deinen Accountdaten hier an.
        </p>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-[600px] flex-col items-center gap-6 rounded-3xl border bg-default-100 p-10">
              {searchParams.has('error') && (
                <p className="text-center text-red-500">
                  <ApiErrorTranslation apiError={searchParams.get('error')} />
                </p>
              )}
              <p className="font-bold">
                Bitte trage deine E-Mail Adresse ein um dein Passwort
                zurückzusetzen.
              </p>
              <Controller
                render={({ field }) => (
                  <AldiInput
                    type="email"
                    placeholder="E-Mail Adresse*"
                    isRequired={true}
                    isInvalid={!!errors.email}
                    errorMessage={
                      errors.email &&
                      'Diese E-Mail Adresse existiert nicht. Bitte überprüfe deine Eingabe und versuche es erneut.'
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

              <AldiButton
                onClick={onClickProceed}
                color="secondary"
                fullWidth={true}
              >
                Passwort zurücksetzen
              </AldiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Page;
