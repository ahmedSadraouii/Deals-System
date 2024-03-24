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

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center px-6 py-8 lg:py-0">
          <AuthTabs />
        </div>
      </section>
    </div>
  );
}
