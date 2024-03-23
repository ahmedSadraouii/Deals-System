import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { LoginForm } from '@/app/(auth)/login/login-form';
import { authOptions } from '@/utils/auth';

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    // run! :d
    // return <Redirect href="/" />;
    return redirect('/');
  }

  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg bg-gray-100 text-center shadow sm:max-w-xl md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
                Anmelden
              </h1>
              <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
                Bitte melde dich an um fortzufahren.
              </h1>

              {searchParams?.error && (
                <p className="text-danger">
                  Die Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.
                </p>
              )}

              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
