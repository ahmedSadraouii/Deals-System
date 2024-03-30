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
  const pageContent = await contentApi.getContent20({
    filter: ['contentType:contentPage'],
  });
  const matchingElement = pageContent.items.find(
    (element) => element.route?.path === `/content/${path}/`,
  );
  if (!matchingElement) {
    return <NotFound />;
  }
  const umbracoContentPage = matchingElement.properties as UmbracoContentPage;
  return (
    <UmbracoRenderer type="contentPage" contentPage={umbracoContentPage} />
  );
}
