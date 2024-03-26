import {
  createConfiguration,
  ServerConfiguration,
  ContentApi,
} from 'api-content';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

function getStuff() {
  const apiConfiguration = createConfiguration({
    baseServer: new ServerConfiguration(
      'https://dev.api.aldi.amplicade.com/umbraco/',
      {},
    ),
  });

  const contentApi = new ContentApi(apiConfiguration);
}

export default async function Page() {
  const [session] = await Promise.all([getServerSession(authOptions)]);

  return (
    <>
      <main className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Server Side Session</h2>
          <p className="text-sm">Keycloak token</p>
          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
          <br />
          {session ? (
            <a
              href="/api/auth/signout"
              className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              SignOut
            </a>
          ) : (
            <a
              href="/api/auth/signin"
              className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              SignIn
            </a>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">CMS Content</h2>
          <p className="text-sm">Fetched directly from Umbraco Delivery API</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">Deals</h2>
          <p className="text-sm">Fetched from deals API</p>
        </div>
      </main>
    </>
  );
}
