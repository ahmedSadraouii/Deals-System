import type { ContentApi } from 'api-content';
import NotFound from '@/app/not-found';
import { UmbracoRenderer } from '@/components/umbraco-cms/umbraco-renderer';
import type { UmbracoContentPage as UmbracoTypesUmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export interface UmbracoContentPageProps {
  path: string;
}

export async function UmbracoContentPage({ path }: UmbracoContentPageProps) {
  const contentApi = getApiClient<ContentApi>({
    type: 'content',
  });
  try {
    const pageContent = await contentApi.getContentItemByPath20({
      path: `/content/${path}/`,
    });
    if (!pageContent) {
      return <NotFound />;
    }
    const umbracoContentPage =
      pageContent.properties as UmbracoTypesUmbracoContentPage;
    return (
      <UmbracoRenderer type="contentPage" contentPage={umbracoContentPage} />
    );
  } catch (error) {
    return <NotFound />;
  }
}
