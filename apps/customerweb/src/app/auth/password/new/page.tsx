'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { passwordRegex } from '@/utils/password-regex';

function Page() {
  const searchParams = useSearchParams();

  const defaultValues = {
    password: '',
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
    console.error(data);
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
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-[600px] flex-col items-center gap-6 rounded-3xl border bg-default-100 p-10">
              {searchParams.has('error') && (
                <p className="text-center text-red-500">
                  <ApiErrorTranslation apiError={searchParams.get('error')} />
                </p>
              )}
              <p className="font-bold">Gib hier dein neues Passwort ein.</p>
              <Controller
                render={({ field }) => (
                  <AldiInput
                    type="password"
                    placeholder="Neues Passwort"
                    isRequired={true}
                    isInvalid={!!errors.password}
                    errorMessage={
                      errors.password &&
                      'Das Passwort muss mindestens einen Großbuchstaben haben.' +
                        'Das Passwort muss mindestens 8 Zeichen haben.' +
                        'Das Passwort muss mindestens ein Sonderzeichen haben.' +
                        'Das Passwort muss mindestens eine Nummer enthalten.'
                    }
                    {...field}
                  />
                )}
                name="email"
                rules={{
                  required: true,
                  validate: (value) => passwordRegex.test(value),
                }}
              />

              <AldiButton
                onClick={onClickProceed}
                color="secondary"
                fullWidth={true}
              >
                Neues Passwort festlegen
              </AldiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Page;
