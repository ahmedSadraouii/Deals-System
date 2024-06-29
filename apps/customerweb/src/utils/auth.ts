import { cookies } from 'next/headers';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuthApiClient } from './auth-api-client';
import type { UserDetailsDto } from 'api-user';
import type { NextAuthOptions, User } from 'next-auth';
import { tryParseApiError } from '@/utils/api-response-handling';
import { getUserApiClient } from '@/utils/user-api-client';

async function refreshAccessToken(
  emailAddress: string,
  refreshToken: string,
  profile: UserDetailsDto,
): Promise<JWT> {
  const authenticationApi = getAuthApiClient({
    refreshToken,
  });

  try {
    const cardinalDirectionResponse =
      await authenticationApi.authenticationGetCardinalDirection({
        cardinalDirectionRequest: {
          email: emailAddress,
        },
      });

    const tokenResponse = await authenticationApi.renewJwtToken({
      cardinalDirection: cardinalDirectionResponse.data?.cardinalDirection || 1,
    });

    const jwtToken = JSON.parse(atob(tokenResponse.accessToken!.split('.')[1]));

    const user: User = {
      id: jwtToken.sub,
      name: jwtToken.preferred_username,
      email: emailAddress,
      rawTokenResponse: tokenResponse,
      cardinalDirection: cardinalDirectionResponse.data?.cardinalDirection || 1,
      profile,
    };

    const now = Math.floor(Date.now() / 1000);

    return {
      ...user,
      profile,
      email: emailAddress,
      accessToken: user.rawTokenResponse.accessToken,
      accessTokenExpires: now + (user.rawTokenResponse.expiresIn ?? 0),
      refreshToken: user.rawTokenResponse.refreshToken,
      refreshTokenExpires: now + (user.rawTokenResponse.refreshExpiresIn ?? 0),
    } as JWT;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to refresh access token');
  }
}

export const authOptions: NextAuthOptions = {
  debug: false,
  events: {
    signOut: async () => {
      const cookieStore = cookies();
      cookieStore.delete('cart-id');
    },
  },
  providers: [
    CredentialsProvider({
      name: 'ad-auth-service',
      credentials: {
        email: { label: 'E-Mail Adresse', type: 'text' },
        password: { label: 'Passwort', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const authenticationApi = getAuthApiClient();
        const userApi = getUserApiClient();

        try {
          const tokenResponse = await authenticationApi.jwtToken({
            cookieRequired: false,
            tokenRequestModel: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          const jwtToken = JSON.parse(
            atob(tokenResponse.accessToken!.split('.')[1]),
          );

          const cardinalDirectionResponse =
            await authenticationApi.authenticationGetCardinalDirection({
              cardinalDirectionRequest: {
                email: credentials.email,
              },
            });

          return {
            id: jwtToken.sub,
            email: credentials.email,
            name: jwtToken.preferred_username,
            rawTokenResponse: tokenResponse,
            // todo: retrieve profile data from backend
            cardinalDirection:
              cardinalDirectionResponse.data?.cardinalDirection || 1,
            profile: await userApi.getAsync({
              ciamId: jwtToken.sub,
              cardinalDirection:
                cardinalDirectionResponse.data!.cardinalDirection,
            }),
          } satisfies User;
        } catch (error: any) {
          if (error?.response?.json) {
            const errorResponse = await (error as any).response.json();
            const apiErrorCode = tryParseApiError(errorResponse);
            throw new Error(apiErrorCode);
          }
          console.error('Error during login:', error);
          throw new Error('UNKNOWN_ERROR');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // <-- make sure to use jwt here
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      const authenticationApi = getAuthApiClient();
      const userApi = getUserApiClient();
      if (user?.id) {
        // fresh sign in
        const now = Math.floor(Date.now() / 1000);
        return {
          ...user,
          ...token,
          accessToken: user.rawTokenResponse.accessToken,
          accessTokenExpires: now + (user.rawTokenResponse.expiresIn ?? 0),
          refreshToken: user.rawTokenResponse.refreshToken,
          refreshTokenExpires:
            now + (user.rawTokenResponse.refreshExpiresIn ?? 0),
        } as JWT;
      }

      const tokenExpired = Date.now() / 1000 > token.accessTokenExpires;
      const refreshTokenExpired = Date.now() / 1000 > token.refreshTokenExpires;

      if (tokenExpired) {
        if (refreshTokenExpired) {
          throw new Error(
            'Refresh token has expired. Please log in again to get a new refresh token. [1]',
          );
        }

        if (!token.email) throw new Error('No email address found in token');

        const cardinalDirectionResponse =
          await authenticationApi.authenticationGetCardinalDirection({
            cardinalDirectionRequest: {
              email: token.email,
            },
          });

        return await refreshAccessToken(
          token.email,
          token.refreshToken,
          await userApi.getAsync({
            ciamId: token.sub,
            cardinalDirection:
              cardinalDirectionResponse.data!.cardinalDirection,
          }),
        );
      }

      if (trigger === 'update') {
        if (!token.email) throw new Error('No email address found in token');

        const cardinalDirectionResponse =
          await authenticationApi.authenticationGetCardinalDirection({
            cardinalDirectionRequest: {
              email: token.email,
            },
          });

        const user = await userApi.getAsync({
          ciamId: token.sub,
          cardinalDirection: cardinalDirectionResponse.data!.cardinalDirection,
        });

        return { ...token, ...user, profile: user };
      }

      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      const tokenExpired = Date.now() / 1000 > token.accessTokenExpires;
      const refreshTokenExpired = Date.now() / 1000 > token.refreshTokenExpires;

      if (tokenExpired && refreshTokenExpired) {
        // jwt callback was unable to renew the access token
        throw new Error(
          'Refresh token has expired. Please log in again to get a new refresh token. [2]',
        );
      }

      const jwtToken = JSON.parse(
        atob(token.rawTokenResponse.accessToken!.split('.')[1]),
      );

      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.refreshToken = token.refreshToken;
      session.refreshTokenExpires = token.refreshTokenExpires;

      session.user = {
        id: jwtToken.sub,
        name: jwtToken.preferred_username,
        rawTokenResponse: token.rawTokenResponse,
        profile: {
          ...token.profile,
        },
        cardinalDirection: token.cardinalDirection,
      } satisfies User;

      return Promise.resolve(session);
    },
  },
};
