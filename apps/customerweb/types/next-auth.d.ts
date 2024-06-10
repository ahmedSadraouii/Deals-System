import type { KeycloakJwtModel } from 'api-auth';
import type { UserDetailsDto } from 'api-user';
import type { DefaultSession, DefaultUser } from 'next-auth';

interface TokenSessionShared {
  rawTokenResponse: KeycloakJwtModel;
  profile: UserDetailsDto;
  cardinalDirection: number;
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
