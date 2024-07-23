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
        {!isRegistrationCompletionRequired && (
          <p className="flex flex-col items-center justify-center gap-2 text-secondary/50 lg:hidden">
            <div className="flex items-center justify-center gap-2">
              <span>Du besitzt ein</span>
              <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" />
              <span>Konto? </span>
            </div>
            <span>Melde dich mit deinen Accountdaten an.</span>
          </p>
        )}
        <div className="w-full rounded-3xl border bg-default-100 p-10">
          {!isRegistrationCompletionRequired && <LoginForm />}
          {isRegistrationCompletionRequired && <RegistrationCompletion />}
        </div>
        {!isRegistrationCompletionRequired && (
          <p className="hidden flex-row items-center justify-center gap-2 text-secondary/50 lg:flex">
            Du besitzt ein <img alt="ALDI SPORTS" src="/aldi-sport-logo.svg" />{' '}
            Konto? Melde dich mit deinen Accountdaten an.
          </p>
        )}
      </div>
    </div>
  );
}
