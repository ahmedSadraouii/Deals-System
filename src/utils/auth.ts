import { AuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export interface FooSession {

}

export const authOptions: AuthOptions = {
  debug: false,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    })
  ],
  session: {
    strategy: "jwt",  // <-- make sure to use jwt here
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token;
      }
      return token
    },
    session: async ({ session, user, token }) => {
      (session as any).token
      return { ...session, token }
    },
  },
}
