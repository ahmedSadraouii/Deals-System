import type { ContentApi, IApiContentResponseModel } from 'api-content';
import { getServerSession } from 'next-auth';
import { Slider } from '@/components/home/slider';
import { authOptions } from '@/utils/auth';
import { getApiClient, getDealsApiClient } from '@/utils/get-api-client';

export const dynamic = 'force-dynamic';

function supplierByPath(
  path: string,
  suppliers: Array<IApiContentResponseModel>,
): IApiContentResponseModel | undefined {
  return suppliers.find((c) => c.route?.path === path);
}

function fullImagePath(path: string): string {
  return `https://dev.api.aldi.amplicade.com/umbraco${path}`;
}

function getSupplierLogo(supplier?: IApiContentResponseModel) {
  if (
    supplier &&
    supplier.properties &&
    supplier.properties.picture &&
    supplier.properties.picture.length > 0
  ) {
    return fullImagePath(supplier.properties.picture[0].url);
  }

  return '';
}

export default async function Page() {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  const session = await getServerSession(authOptions);
  const dealsApi = getDealsApiClient({ accessToken: session?.accessToken });

  const [landingPageContent, dealsContent, suppliersContent, deals] =
    await Promise.all([
      contentApi.getContentItemByPath({
        path: '/content/landing-page',
      }),
      contentApi.getContent20({
        fetch: 'children:/content/deals/',
      }),
      contentApi.getContent20({
        fetch: 'children:/content/suppliers/',
      }),
      dealsApi.getDeals({
        sortBy: 'mostSold',
        take: 100,
        skip: 0,
      }),
    ]);

  // console.log(JSON.stringify(deals, null, 2));
  // console.log(JSON.stringify(suppliers, null, 2));

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

          <p className="text-sm">Fetched from Deals API</p>
          <pre>{JSON.stringify(deals, null, 2)}</pre>

          <p className="text-sm">Fetched from Umbraco Delivery API</p>
          <pre>{JSON.stringify(landingPageContent, null, 2)}</pre>
          <pre>{JSON.stringify(dealsContent, null, 2)}</pre>
          <pre>{JSON.stringify(suppliersContent, null, 2)}</pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">Deals</h2>
          <p className="text-sm">Fetched from deals API</p>

          {dealsContent && dealsContent.items && (
            <Slider
              name="Last minute deals"
              bg="gray"
              data={dealsContent.items.map((s: any) => ({
                id: s.id,
                name: s.name,
                image:
                  s?.properties?.pictures?.length > 0
                    ? fullImagePath(s.properties.pictures[0].url)
                    : '/slider-train.png',
                logo: getSupplierLogo(
                  supplierByPath(
                    s.properties?.supplier?.route.path,
                    suppliersContent.items,
                  ),
                ),
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
