import type { KeycloakJwtModel } from 'api-auth';
import type { DefaultSession, DefaultUser } from 'next-auth';

interface TokenSessionShared {
  rawTokenResponse: KeycloakJwtModel;
  profile: {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
    user: User;
  }

  interface User extends DefaultUser, TokenSessionShared {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TokenSessionShared {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
  }
}
