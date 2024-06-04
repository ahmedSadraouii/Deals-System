import { redirect } from 'next/navigation';
import type { AuthenticationApi } from 'api-auth';
import type { UserApi } from 'api-user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getApiClient } from '@/utils/get-api-client';

export default async function Page() {
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
    <div className="monospace whitespace-pre-wrap">
      {JSON.stringify(userDetails, null, 2)}
    </div>
  );
}
