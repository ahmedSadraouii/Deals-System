import { redirect } from 'next/navigation';
import type { CardinalDirection } from 'api-user';
import { getServerSession } from 'next-auth';
import { PersonalInformationForm } from '@/app/profile/general/personal-information-form';
import { authOptions } from '@/utils/auth';
import { getUserApiClient } from '@/utils/user-api-client';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const userApi = getUserApiClient();

  const userDetails = await userApi.getAsync({
    ciamId: session.user.id,
    cardinalDirection: session.user.cardinalDirection as CardinalDirection,
  });

  return <PersonalInformationForm initialFormValues={userDetails} />;
}
