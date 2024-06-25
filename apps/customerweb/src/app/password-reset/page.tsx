'use client';

import { useCallback, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { resetPasswordAction } from '@/app/auth/actions/reset-password.action';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiPasswordInput } from '@/components/nextui/aldi-password-input';
import { validateAldiPassword } from '@/utils/validate-aldi-password';

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const code = searchParams?.code;

  const router = useRouter();

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

  const [isLoading, setLoading] = useState(false);
  const [hasApiError, setApiError] = useState(false);

  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      if (!code) return;

      setLoading(true);
      try {
        const returnValue = await resetPasswordAction({
          code,
          newPassword: data.password,
        });
        console.log({ returnValue });
        router.push('/auth/password-forget/success');
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
      }
    },
    [code, router],
  );

  const onClickProceed = useCallback(async () => {
    if (await trigger()) {
      await handleSubmit(onSubmit)();
    }
  }, [handleSubmit, onSubmit, trigger]);

  if (!code) {
    return redirect('/');
  }

  return (
    <section className="bg-neutral-50">
      <div className="flex flex-col items-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center py-20">
          <h1 className="mb-20 text-center text-5xl font-bold text-secondary">
            Setze jetzt dein Passwort zurück.
          </h1>
          <FormProvider {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-row justify-center"
            >
              <div className="flex basis-[600px] flex-col items-center gap-6 rounded-3xl border bg-default-100 p-10">
                {hasApiError && (
                  <p className="text-center text-red-500">
                    Ein Fehler ist aufgetreten. Möglicherweise ist dein
                    Passwort-Reset-Link abgelaufen. Bitte fordere einen neuen
                    Link an oder versuche es erneut.
                  </p>
                )}
                <Controller
                  render={({ field }) => (
                    <AldiPasswordInput
                      placeholder="Passwort*"
                      isRequired={true}
                      isInvalid={!!errors.password}
                      errorMessage={
                        errors.password && (
                          <ApiErrorTranslation
                            errorOverride={errors.password.message}
                          />
                        )
                      }
                      {...field}
                    />
                  )}
                  name="password"
                  rules={{
                    required: true,
                    validate: validateAldiPassword,
                  }}
                />
                <AldiButton
                  onClick={onClickProceed}
                  color="secondary"
                  fullWidth={true}
                  isLoading={isLoading}
                >
                  Neues Passwort festlegen
                </AldiButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
