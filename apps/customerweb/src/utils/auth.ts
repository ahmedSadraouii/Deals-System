import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  AuthenticationApi,
  createConfiguration,
  IsomorphicFetchHttpLibrary as DefaultHttpLibrary,
  ServerConfiguration,
} from 'api-auth';
import type { NextAuthOptions, User } from 'next-auth';

async function refreshAccessToken(
  emailAddress: string,
  refreshToken: string,
): Promise<JWT> {
  const apiConfiguration = createConfiguration({
    baseServer: new ServerConfiguration(
      'https://dev.api.aldi.amplicade.com/',
      {},
    ),
    httpApi: {
      send: (request) => {
        const defaultHttpLibrary = new DefaultHttpLibrary();
        request.addCookie('refreshToken', refreshToken);
        return defaultHttpLibrary.send(request);
      },
    },
  });

  const authenticationApi = new AuthenticationApi(apiConfiguration);
  try {
    const cardinalDirectionResponse =
      await authenticationApi.getCardinalDirection('1', {
        email: emailAddress,
      });

    const tokenResponse = await authenticationApi.renewJwtToken(
      cardinalDirectionResponse.data?.cardinalDirection || '1',
      '1',
    );
    const jwtToken = JSON.parse(atob(tokenResponse.accessToken!.split('.')[1]));

    const user: User = {
      id: jwtToken.sub,
      name: jwtToken.preferred_username,
      rawTokenResponse: tokenResponse,
      // todo: retrieve profile data from backend
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: emailAddress,
      },
    };

    const now = Math.floor(Date.now() / 1000);

    return {
      ...user,

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
  providers: [
    CredentialsProvider({
      name: 'ad-auth-service',
      credentials: {
        email: { label: 'E-Mail Adresse', type: 'text' },
        password: { label: 'Passwort', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const apiConfiguration = createConfiguration({
          baseServer: new ServerConfiguration(
            'https://dev.api.aldi.amplicade.com/',
            {},
          ),
        });

        const authenticationApi = new AuthenticationApi(apiConfiguration);
        try {
          const tokenResponse = await authenticationApi.jwtToken('', {
            email: credentials.email,
            password: credentials.password,
          });
          const jwtToken = JSON.parse(
            atob(tokenResponse.accessToken!.split('.')[1]),
          );
          return {
            id: jwtToken.sub,
            email: credentials.email,
            name: jwtToken.preferred_username,
            rawTokenResponse: tokenResponse,
            // todo: retrieve profile data from backend
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              emailAddress: credentials.email,
            },
          } satisfies User;
        } catch (error) {
          console.log(error);
          // todo: validate error message from backend and handle it properly
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // <-- make sure to use jwt here
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.id) {
        const now = Math.floor(Date.now() / 1000);
        return {
          ...token,
          ...user,
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

        return await refreshAccessToken(
          token.profile.emailAddress,
          token.refreshToken,
        );
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
      } satisfies User;

      return Promise.resolve(session);
    },
  },
};
