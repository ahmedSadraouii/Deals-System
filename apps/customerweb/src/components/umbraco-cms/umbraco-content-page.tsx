import NotFound from '@/app/not-found';
import { UmbracoRenderer } from '@/components/umbraco-cms/umbraco-renderer';
import type { UmbracoContentPage as UmbracoTypesUmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';
import { authOptions } from '@/utils/auth';
import { getContentApiClient } from '@/utils/content-api-client';
import { getServerSession } from 'next-auth';

export interface UmbracoContentPageProps {
  path: string;
}

export async function UmbracoContentPage({ path }: UmbracoContentPageProps) {
  const session = getServerSession(authOptions); 
  const contentApi = getContentApiClient();
  const isGuest = false; // session == null 

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
      <UmbracoRenderer type="contentPage" contentPage={umbracoContentPage} isGuest={isGuest} />
    );
  } catch (error) {
    return <NotFound />;
  }
}
