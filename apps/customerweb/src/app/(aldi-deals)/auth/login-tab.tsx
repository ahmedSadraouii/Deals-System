'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/app/(aldi-deals)/auth/login-form';
import { RegistrationCompletion } from '@/app/(aldi-deals)/auth/registration-completion';
import { ApiErrorCodes } from '@/utils/api-response-handling';

export function LoginTab() {
  const searchParams = useSearchParams();

  const apiError = useMemo(() => searchParams.get('error'), [searchParams]);

  const isRegistrationCompletionRequired =
    apiError === ApiErrorCodes.REGISTRATION_COMPLETION_REQUIRED;

  return (
    <div className="flex flex-row justify-center">
      <div className="flex basis-[600px] flex-col items-center gap-8">
        <div className="w-full rounded-3xl border bg-default-100 p-4 lg:p-10">
          {!isRegistrationCompletionRequired && <LoginForm />}
          {isRegistrationCompletionRequired && <RegistrationCompletion />}
        </div>
        {!isRegistrationCompletionRequired && (
          <p className="text-center text-secondary/50">
            Du besitzt ein{' '}
            <img
              className="inline-block"
              alt="ALDI SPORTS"
              src="/aldi-sport-logo.svg"
            />{' '}
            Konto? Melde dich mit deinen Accountdaten an.
          </p>
        )}
      </div>
    </div>
  );
}
