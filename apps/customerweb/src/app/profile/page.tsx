import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { catchApiError } from '@/utils/catch-api-error';
import { getUserApiClient } from '@/utils/get-user-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const userApi = getUserApiClient();

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
