'use server';

import { getServerSession } from 'next-auth';
import type { ApiErrorCodes } from '@/utils/api-response-handling';
import { tryParseApiErrorWithFallback } from '@/utils/api-response-handling';
import { authOptions } from '@/utils/auth';
import { getUserApiClient } from '@/utils/user-api-client';

export interface UpdateProfileInformationActionParams {
  firstName: string;
  lastName: string;
  addressCity: string | null;
  addressStreet: string | null;
  addressHouseNumber: string | null;
  dateOfBirth: string | null;
}

export async function updateProfileInformationAction({
  firstName,
  lastName,
  addressCity,
  addressStreet,
  addressHouseNumber,
  dateOfBirth,
}: UpdateProfileInformationActionParams): Promise<{
  success: boolean;
  apiErrorCode?: ApiErrorCodes;
  message?: string;
}> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('User is not authenticated');
  }

  if (
    !firstName ||
    !lastName ||
    firstName.length === 0 ||
    lastName.length === 0
  ) {
    return {
      success: false,
      message: 'First name and last name must not be empty',
    };
  }

  const userApi = getUserApiClient();

  try {
    await userApi.updateAsync({
      userUpdateRequest: {
        ciamId: session.user.profile.ciamUserId!,
        firstName,
        lastName,
        addressCity,
        addressStreet,
        addressHouseNumber,
        dateOfBirth:
          dateOfBirth !== null ? new Date(Date.parse(dateOfBirth)) : undefined,
        cardinalDirection: session.user.profile.cardinalDirection!,
      },
    });

    return {
      success: true,
    };
  } catch (error: any) {
    if (error?.response?.json) {
      const errorResponse = await (error as any).response.json();
      const apiError = tryParseApiErrorWithFallback(errorResponse);
      return {
        success: false,
        apiErrorCode: apiError.errorCode,
        message: apiError.message,
      };
    }
    throw error;
  }
}
