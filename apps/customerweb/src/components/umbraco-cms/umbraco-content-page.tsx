import NotFound from '@/app/not-found';
import { UmbracoRenderer } from '@/components/umbraco-cms/umbraco-renderer';
import type { UmbracoContentPage as UmbracoTypesUmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';

export interface UmbracoContentPageProps {
  path: string;
}

export async function UmbracoContentPage({ path }: UmbracoContentPageProps) {
  const contentApi = getContentApiClient();

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
    console.log('huhu error: ', error);
    return <NotFound />;
  }
}
