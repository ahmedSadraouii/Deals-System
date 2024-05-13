import type { ValidateResult } from 'react-hook-form';

export function validateAldiPassword(value: string): ValidateResult {
  const containsUppercaseCharacters = /[A-Z]/.test(value);
  const hasAtLeastEightCharacters = value.length >= 8;
  const containsSpecialCharacters =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  const containsNumbers = /[0-9]/.test(value);

  const errorMessages = [];

  if (!containsUppercaseCharacters) {
    errorMessages.push(
      'Das Passwort muss mindestens einen Großbuchstaben haben.',
    );
  }

  if (!hasAtLeastEightCharacters) {
    errorMessages.push('Das Passwort muss mindestens 8 Zeichen haben.');
  }

  if (!containsSpecialCharacters) {
    errorMessages.push('Das Passwort muss mindestens ein Sonderzeichen haben.');
  }

  if (!containsNumbers) {
    errorMessages.push('Das Passwort muss mindestens eine Nummer enthalten.');
  }

  if (errorMessages.length === 0) {
    return true;
  }

  return errorMessages.join('\n');
}
