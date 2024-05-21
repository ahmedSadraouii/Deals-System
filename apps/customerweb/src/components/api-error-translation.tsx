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
  if (errorOverride)
    return <span className="whitespace-pre">{errorOverride}</span>;

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
      case ApiErrorCodes.INVALID_CREDENTIALS:
        return (
          <>
            Die eingegebenen Anmeldedaten sind ungültig. Bitte versuche es
            erneut.
          </>
        );
      case ApiErrorCodes.REGISTRATION_COMPLETION_REQUIRED:
        return (
          <>
            Sie müssen die Registrierung abschließen, bevor Sie sich anmelden.
          </>
        );
      case ApiErrorCodes.EMAIL_VERIFICATION_REQUIRED:
        return (
          <>
            Die Registrierung für deine E-Mail-Adresse wurde nicht
            abgeschlossen. Bitte prüfe dein E-Mail-Postfach und klicke auf den
            Bestätigungslink, um fortzufahren.
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
