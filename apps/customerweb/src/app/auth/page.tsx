import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { AuthTabs } from '@/app/auth/auth-tabs';
import { authOptions } from '@/utils/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    // run! :d
    // return <Redirect href="/" />;
    return redirect('/');
  }

  return <AuthTabs />;
}
