export enum ApiErrorCodes {
  EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
  PASSWORD_LENGTH_MISMATCH = 'PASSWORD_LENGTH_MISMATCH',
  PASSWORD_INVALID = 'PASSWORD_INVALID',
  UNKNOWN = 'UNKNOWN',
}

export function tryParseApiError(error: any): ApiErrorCodes {
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
  }
  return ApiErrorCodes.UNKNOWN;
}
