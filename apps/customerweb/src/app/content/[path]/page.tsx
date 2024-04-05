import type { ContentApi } from 'api-content';
import NotFound from '@/app/not-found';
import { UmbracoRenderer } from '@/components/umbraco-cms/umbraco-renderer';
import type { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  try {
    const pageContent = await contentApi.getContentItemByPath20({
      path: `/content/${path}/`,
    });
    if (!pageContent) {
      return <NotFound />;
    }
    const umbracoContentPage = pageContent.properties as UmbracoContentPage;
    return (
      <div id="umbracooo">
        <UmbracoRenderer type="contentPage" contentPage={umbracoContentPage} />
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
}
