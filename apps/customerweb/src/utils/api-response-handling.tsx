export enum ApiErrorCodes {
  EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
  PASSWORD_LENGTH_MISMATCH = 'PASSWORD_LENGTH_MISMATCH',
  PASSWORD_INVALID = 'PASSWORD_INVALID',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  REGISTRATION_COMPLETION_REQUIRED = 'REGISTRATION_COMPLETION_REQUIRED',
  UNKNOWN = 'UNKNOWN',
}

export function tryParseApiError(error: any): ApiErrorCodes {
  if (!error || typeof error !== 'object') {
    return ApiErrorCodes.UNKNOWN;
  }

  if ('errorCode' in error && !!error.errorCode) {
    switch (error.errorCode) {
      case 'EMAIL_ALREADY_IN_USE':
        return ApiErrorCodes.EMAIL_ALREADY_IN_USE;
      case 'PASSWORD_INVALID':
        return ApiErrorCodes.PASSWORD_INVALID;
    }
  }
  if ('message' in error && !!error.message) {
    if (
      error.message.includes(
        'The password must be between 8 and 32 characters long.',
      )
    ) {
      return ApiErrorCodes.PASSWORD_LENGTH_MISMATCH;
    }

    if (
      error.message.includes(
        'Die eingegebene E-Mail-Adresse und das Passwort stimmen nicht überein.',
      )
    ) {
      return ApiErrorCodes.INVALID_CREDENTIALS;
    }

    if (error.message.includes('REGISTRATION_COMPLETION_REQUIRED')) {
      return ApiErrorCodes.REGISTRATION_COMPLETION_REQUIRED;
    }

    console.log('Uncaught error message:', error.message);
  }
  return ApiErrorCodes.UNKNOWN;
}
