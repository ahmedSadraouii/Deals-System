import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import type { CardinalDirection } from 'api-user';
import { getServerSession } from 'next-auth';
import { ProfileDesktopHeader } from '@/app/profile/profile-desktop-header';
import { ProfileMobileHeader } from '@/app/profile/profile-mobile-header';
import { authOptions } from '@/utils/auth';
import { getUserApiClient } from '@/utils/user-api-client';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const userApi = getUserApiClient();

  const userDetails = await userApi.getAsync({
    ciamId: session.user.id,
    cardinalDirection: session.user.cardinalDirection as CardinalDirection,
  });

  return (
    <div className="container mx-auto flex flex-col">
      <div className="m-4">
        <div className="block lg:hidden">
          <ProfileMobileHeader userDetails={userDetails} />
        </div>
        <div className="hidden lg:block">
          <ProfileDesktopHeader />
        </div>
      </div>

      {children}
    </div>
  );
}
