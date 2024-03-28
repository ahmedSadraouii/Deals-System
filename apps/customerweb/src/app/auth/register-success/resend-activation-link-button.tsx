'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { AuthenticationApi } from 'api-auth';
import { AldiButton } from '@/components/nextui/aldi-button';
import { useApiClient } from '@/hooks/use-api-client';

export interface ResendActivationLinkButtonProps {
  emailAddress: string;
}
export function ResendActivationLinkButton({
  emailAddress,
}: ResendActivationLinkButtonProps) {
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [timerDone, setTimerDone] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        setTotalSeconds(totalSeconds - 1);
      } else {
        setTimerDone(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);

  const minutes = useMemo(() => Math.floor(totalSeconds / 60), [totalSeconds]);
  const seconds = useMemo(
    () => (totalSeconds % 60).toString().padStart(2, '0'),
    [totalSeconds],
  );

  const emailVerificationText = useMemo(() => {
    if (verificationEmailSent) return 'E-Mail wurde gesendet';
    if (timerDone) return 'E-Mail erneut senden';
    return `E-Mail erneut senden in ${minutes}:${seconds}`;
  }, [verificationEmailSent, timerDone, minutes, seconds]);

  const authenticationApi = useApiClient<AuthenticationApi>({ type: 'auth' });

  const onResendActivationLink = useCallback(async () => {
    if (!emailAddress) return;

    await authenticationApi.resendEmailVerificationAsync({
      resendVerificationEmailRequest: {
        email: emailAddress,
      },
    });

    setVerificationEmailSent(true);
  }, [authenticationApi, emailAddress]);

  return (
    <AldiButton
      variant="ghost"
      color="secondary"
      onClick={onResendActivationLink}
      isDisabled={!timerDone || verificationEmailSent}
    >
      {emailVerificationText}
    </AldiButton>
  );
}
