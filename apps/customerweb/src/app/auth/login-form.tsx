'use client';

import { useCallback, useMemo, useState } from 'react';
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

export function LoginForm() {
  const searchParams = useSearchParams();

  const [isLoggingIn, setLoggingIn] = useState(false);
  const apiError = useMemo(() => searchParams.get('error'), [searchParams]);

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

  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      if (isLoggingIn) return;

      setLoggingIn(true);

      // temporarily store email and password in sessionStorage, might be needed for TOS accept screen
      sessionStorage.setItem(
        'login-credentials',
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      );

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    },
    [isLoggingIn],
  );

  const onClickProceed = useCallback(async () => {
    if (await trigger()) {
      await handleSubmit(onSubmit)();
    }
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex shrink basis-[600px] flex-col items-center gap-6">
          {searchParams.has('error') && (
            <p className="text-center text-red-500">
              <ApiErrorTranslation apiError={apiError} />
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
            href="/auth/password-forget"
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
            type="submit"
            isLoading={isLoggingIn}
            size="lg"
          >
            Anmelden
          </AldiButton>
        </div>
      </form>
    </FormProvider>
  );
}
