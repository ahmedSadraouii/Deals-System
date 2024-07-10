import { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-content-page';

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  return <UmbracoContentPage path={path} />;
}
