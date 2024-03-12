import {getContentItem, getDeals} from "@/utils/apiclient";
import {authOptions} from "@/utils/auth";
import {getServerSession} from "next-auth";

export default async function Get({params, searchParams}: any) {
  const [session, content, deals] = await Promise.all([
    getServerSession(authOptions),
    getContentItem("9e5c5876-2e3b-49d4-af08-d671435cab02"),
    getDeals()
  ]);

  return (<>


      <main className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Server Side Session</h2>
          <p className="text-sm">Keycloak token</p>
          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
          <br/>
          {session ? (
            <a href="/api/auth/signout"
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SignOut</a>
          ) : (
            <a href="/api/auth/signin"
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SignIn</a>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">CMS Content</h2>
          <p className="text-sm">Fetched directly from Umbraco Delivery API</p>
          {content && <pre>{JSON.stringify(content, null, 2)}</pre>}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold">Deals</h2>
          <p className="text-sm">Fetched from deals API</p>
          {deals && <pre>{JSON.stringify(deals, null, 2)}</pre>}
        </div>
      </main>
    </>
  );
}
