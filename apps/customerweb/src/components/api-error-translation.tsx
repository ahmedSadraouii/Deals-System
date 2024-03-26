import type { ReactNode } from 'react';
import { ApiErrorCodes } from '@/utils/api-response-handling';

export interface ApiErrorTranslationProps {
  apiError?: ApiErrorCodes | string | null;
  allowedErrors?: Array<ApiErrorCodes>;
  errorOverride?: ReactNode;
}

export function ApiErrorTranslation({
  apiError,
  allowedErrors = [],
  errorOverride,
}: ApiErrorTranslationProps) {
  if (errorOverride) return errorOverride;

  if (
    apiError &&
    (!allowedErrors ||
      allowedErrors.length === 0 ||
      allowedErrors.indexOf(apiError as any) !== -1)
  ) {
    switch (apiError) {
      case ApiErrorCodes.EMAIL_ALREADY_IN_USE:
        return (
          <>
            Diese E-Mail Adresse ist bereits mit einem ALDI SPORTS Konto
            verknüpft. Bitte melde dich hier an.
          </>
        );
      case ApiErrorCodes.PASSWORD_LENGTH_MISMATCH:
      case ApiErrorCodes.PASSWORD_INVALID:
        return (
          <>
            Das Passwort muss mindestens einen Großbuchstaben haben.
            <br />
            Das Passwort muss mindestens 8 Zeichen haben.
            <br />
            Das Passwort muss mindestens ein Sonderzeichen haben.
            <br />
            Das Passwort muss mindestens eine Nummer enthalten.
          </>
        );
      case 'invalid-credentials':
        return (
          <>
            Die eingegebenen Anmeldedaten sind ungültig. Bitte versuche es
            erneut.
          </>
        );
      case null:
      case undefined:
        return null;
    }
    return <>Unbekannter Fehler</>;
  }

  return null;
}
