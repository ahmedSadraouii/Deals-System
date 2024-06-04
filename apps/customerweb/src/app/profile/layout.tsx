import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import type { AuthenticationApi } from 'api-auth';
import type { UserApi } from 'api-user';
import { getServerSession } from 'next-auth';
import { ProfileDesktopHeader } from '@/app/profile/profile-desktop-header';
import { ProfileMobileHeader } from '@/app/profile/profile-mobile-header';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getApiClient } from '@/utils/get-api-client';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const _authenticationApi = getApiClient<AuthenticationApi>({
    type: 'auth',
  });

  const userApi = getApiClient<UserApi>({
    type: 'user',
  });

  const userDetails = await userApi
    .getAsync({
      ciamId: session.user.id,
    })
    .catch(catchApiError);

  return (
    <div className="container mx-auto flex flex-col">
      <div className="block lg:hidden">
        <ProfileMobileHeader userDetails={userDetails} />
      </div>
      <div className="hidden lg:block">
        <ProfileDesktopHeader />
      </div>

      {children}
    </div>
  );
}
