import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PersonalInformationForm } from '@/app/profile/personal-information/personal-information-form';
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

  console.log(userDetails);

  return <PersonalInformationForm initialFormValues={userDetails} />;
}
