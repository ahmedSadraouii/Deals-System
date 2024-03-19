import CredentialsProvider from 'next-auth/providers/credentials';
import {
  AuthenticationApi,
  createConfiguration,
  ServerConfiguration,
} from 'api-auth';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  debug: false,
  providers: [
    CredentialsProvider({
      name: 'ad-auth-service',
      credentials: {
        email: { label: 'E-Mail Adresse', type: 'text' },
        password: { label: 'Passwort', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('signing in', credentials);
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
          };
        } catch (error) {
          console.log(error);
          // todo: validate error message from backend and handle it properly
          throw new Error('Invalid credentials');
        }

        return null;
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
};
