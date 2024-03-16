import NextAuth from 'next-auth';
import { authOptions } from '@/utils/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// https://stackoverflow.com/questions/59278955/docker-compose-volume-doesnt-save-state-of-container-for-keycloak
// https://github.com/nextauthjs/next-auth/issues/7913
