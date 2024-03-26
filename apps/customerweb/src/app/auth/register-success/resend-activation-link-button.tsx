'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AuthenticationApi,
  createConfiguration,
  ServerConfiguration,
} from 'api-auth';
import { AldiButton } from '@/components/nextui/aldi-button';

export interface ResendActivationLinkButtonProps {
  emailAddress: string;
}
export function ResendActivationLinkButton({
  emailAddress,
}: ResendActivationLinkButtonProps) {
  const [totalSeconds, setTotalSeconds] = useState(5);
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

  const onResendActivationLink = useCallback(async () => {
    if (!emailAddress) return;

    const apiConfiguration = createConfiguration({
      baseServer: new ServerConfiguration('/auth-api', {}),
    });

    const authenticationApi = new AuthenticationApi(apiConfiguration);

    await authenticationApi.resendEmailVerificationAsync('1', {
      email: emailAddress,
    });

    setVerificationEmailSent(true);
  }, [emailAddress]);

  return (
    <AldiButton
      variant="ghost"
      color="secondary"
      onClick={onResendActivationLink}
      isDisabled={!timerDone || verificationEmailSent}
    >
      {verificationEmailSent
        ? 'E-Mail wurde gesendet'
        : timerDone
        ? 'E-Mail erneut senden'
        : `E-Mail erneut senden in ${minutes}:${seconds}`}
    </AldiButton>
  );
}
