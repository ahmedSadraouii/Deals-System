import { redirect } from 'next/navigation';
import type { AuthenticationApi } from 'api-auth';
import type { UserApi } from 'api-user';
import { getServerSession } from 'next-auth';
import MenuBar from '@/components/account/menu-bar';
import ProfileAvatar from '@/components/account/profile-avatar';
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
    <div className="container mx-auto py-14">
      <MenuBar />
      <div className="mx-auto mt-10 max-w-4xl">
        <div className="rounded-xl bg-gray-100 p-5">
          <div className="mx-auto max-w-xl">
            <div className="mb-10 flex items-center">
              <ProfileAvatar />
              <h1 className="ml-4 text-4xl font-bold">Henrik Ekstrand</h1>
            </div>
            <hr className="mb-10 border-b-2" />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
