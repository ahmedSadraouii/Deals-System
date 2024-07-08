'use server';

import { CardinalDirection } from 'api-deals';
import { getAccountApiClient } from '@/utils/deals-api-client';

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

  /*const serverSession = await getServerSession(authOptions);
  if (serverSession) {
    // check cardinal direction from session
    return serverSession.user.cardinalDirection === 1; // 1 is sued
  }*/

  // check cardinal direction of postal code to determine if it is in the correct region
  const accountApiClient = getAccountApiClient({});
  const getCardinalDirectionResponse =
    await accountApiClient.getCardinalDirection({
      postalCode: `${postalCode}`,
    });

  const allowedCardinalDirections: Array<CardinalDirection> = [
    CardinalDirection.Sued,
  ];

  console.log({
    getCardinalDirectionResponse,
    allowedCardinalDirections,
    postalCode,
  });

  return (
    getCardinalDirectionResponse.cardinalDirection !== undefined &&
    allowedCardinalDirections.includes(
      getCardinalDirectionResponse.cardinalDirection,
    )
  );
}
