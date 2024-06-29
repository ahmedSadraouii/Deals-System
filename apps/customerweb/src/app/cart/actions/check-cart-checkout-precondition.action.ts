'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { getPostalCodeApiClient } from '@/utils/get-postal-code-api-client';

export interface CheckCartCheckoutPreconditionAction {
  countryCode: string;
  postalCode: number;
}

export async function checkCartCheckoutPreconditionAction({
  countryCode,
  postalCode,
}: CheckCartCheckoutPreconditionAction): Promise<boolean> {
  if (countryCode !== 'DE') {
    return false;
  }
  if (!/^\d{5}$/.test(postalCode.toString())) {
    return false;
  }

  const serverSession = await getServerSession(authOptions);
  if (serverSession) {
    // check cardinal direction from session
    return serverSession.user.cardinalDirection === 1; // 1 is sued
  }

  // check cardinal direction of postal code to determine if it is in the correct region
  const postalCodeApiClient = getPostalCodeApiClient();
  // TODO: implement postal code check, russlan will take care of it
  // because the postal code api client returns a content type JSON but the response is a string
  // also the response model is not correct in the openapi spec
  return true;
}
