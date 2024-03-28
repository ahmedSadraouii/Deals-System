import type { ContentApi } from 'api-content';
import { getServerSession } from 'next-auth';
import { Slider } from '@/components/home/slider';
import { authOptions } from '@/utils/auth';
import { getApiClient } from '@/utils/get-api-client';

export default async function Page() {
  const contentApi = getApiClient<ContentApi>({ type: 'content' });

  const [session, landingPage, deals] = await Promise.all([
    getServerSession(authOptions),
    contentApi.getContentItemById20({
      id: '1b639400-1757-49ea-aa97-19e44c73b6f0',
    }),
    contentApi.getContent20({
      fetch: 'children:1b639400-1757-49ea-aa97-19e44c73b6f0',
    }),
  ]);

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

          <pre>{JSON.stringify(landingPage, null, 2)}</pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">Deals</h2>
          <p className="text-sm">Fetched from deals API</p>

          {deals && deals.items && (
            <Slider
              name="Last minute deals"
              bg="gray"
              data={deals.items.map((s: any) => ({
                id: s.id,
                name: s.name,
                image: '/slider-train.png',
                logo: '/logos/check24-logo.svg',
                price: s.properties.regularPrice,
                discountPrice: s.properties.price,
              }))}
            />
          )}
        </div>
      </main>
    </>
  );
}
