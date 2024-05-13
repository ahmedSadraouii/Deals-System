import { redirect } from 'next/navigation';
import type { AuthenticationApi } from 'api-auth';
import { getServerSession } from 'next-auth';
import { IconProfile } from '@/components/svg/icon-profile';
import { authOptions } from '@/utils/auth';
import { getApiClient } from '@/utils/get-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const authenticationApi = getApiClient<AuthenticationApi>({
    ssr: true,
    type: 'auth',
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 rounded-lg bg-gray-50 p-4 lg:rounded-[20px]">
        <div className="rounded-full border border-secondary/10 bg-white p-3">
          <IconProfile />
        </div>
        <div className="flex flex-col">
          <p>Schön dich zu sehen,</p>
          <h2>{session.user.name}</h2>
        </div>
      </div>
    </div>
  );
}
