'use client';

import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Link } from '@nextui-org/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { passwordForgetRequestAction } from '@/app/(aldi-deals)/auth/actions/password-forget-request.action';
import { ApiErrorTranslation } from '@/components/api-error-translation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { emailRegex } from '@/utils/email-regex';

export default function Page() {
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = {
    email: '',
  };

  const [wasSent, setWasSent] = useState(false);

  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    setLoading(true);
    const returnValue = await passwordForgetRequestAction({
      email: data.email,
    });
    setWasSent(returnValue.success);
    setLoading(false);
  }, []);

  const onClickProceed = useCallback(async () => {
    if (await trigger()) {
      await handleSubmit(onSubmit)();
    }
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <>
      <h1 className="mb-20 text-center text-5xl font-bold text-secondary">
        Setzte jetzt dein Passwort zurück.
      </h1>

      <div className="flex w-full flex-col gap-10">
        <p className="text-center text-secondary/50">
          Du weißt dein Passwort? Melde dich mit deinen Accountdaten{' '}
          <Link
            as={NextLink}
            className="pointer-events-auto cursor-pointer"
            href="/auth"
            color="secondary"
            underline="always"
          >
            hier
          </Link>{' '}
          an.
        </p>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-6 rounded-3xl border bg-default-100 p-10">
              {searchParams.has('error') && (
                <p className="text-center text-red-500">
                  <ApiErrorTranslation apiError={searchParams.get('error')} />
                </p>
              )}
              <p className="text-center font-bold text-secondary">
                {wasSent && (
                  <>
                    Wir haben dir eine Mail zugesendet um dein Passwort
                    zurückzusetzen. Bitte schau in deinem Postfach nach.
                  </>
                )}
                {!wasSent && (
                  <>
                    Bitte trage deine E-Mail Adresse ein um dein Passwort
                    zurückzusetzen.
                  </>
                )}
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
                isLoading={isLoading}
              >
                Passwort zurücksetzen
              </AldiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
