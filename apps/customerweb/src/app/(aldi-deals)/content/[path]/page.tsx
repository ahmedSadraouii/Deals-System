import { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-content-page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  return <UmbracoContentPage path={path} />;
}
