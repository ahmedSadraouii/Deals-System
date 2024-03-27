'use client';

import { useCallback } from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Link } from '@nextui-org/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { AldiPasswordInput } from '@/components/nextui/aldi-password-input';
import { emailRegex } from '@/utils/email-regex';

export function LoginTab() {
  const searchParams = useSearchParams();

  const defaultValues = {
    email: '',
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
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });
  }, []);

  const onClickProceed = useCallback(async () => {
    await trigger();
    await handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <div className="flex flex-col gap-8">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-[600px] flex-col items-center gap-6 rounded-3xl border bg-default-100 p-10">
            {searchParams.has('error') && (
              <p className="text-center text-red-500">
                <ApiErrorTranslation apiError={searchParams.get('error')} />
              </p>
            )}

            <Controller
              render={({ field }) => (
                <AldiInput
                  type="email"
                  placeholder="E-Mail Adresse*"
                  isRequired={true}
                  isInvalid={!!errors.email}
                  errorMessage={
                    errors.email && 'Eine korrekte E-Mail Adresse wird benötigt'
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

            <Controller
              render={({ field }) => (
                <AldiPasswordInput
                  placeholder="Passwort*"
                  isRequired={true}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password && 'Passwort wird benötigt'}
                  {...field}
                />
              )}
              name="password"
              rules={{
                required: true,
              }}
            />
            <Link
              as={NextLink}
              href="/password-forget"
              size="lg"
              color="secondary"
              underline="always"
              className="mb-4"
            >
              Passwort vergessen?
            </Link>
            <AldiButton
              onClick={onClickProceed}
              color="secondary"
              fullWidth={true}
            >
              Anmelden
            </AldiButton>
          </div>
        </form>
      </FormProvider>
      <p className="flex flex-row items-center justify-center gap-2 text-secondary/50">
        Du besitzt ein <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" />{' '}
        Konto? Melde dich mit deinen Accountdaten an.
      </p>
    </div>
  );
}
