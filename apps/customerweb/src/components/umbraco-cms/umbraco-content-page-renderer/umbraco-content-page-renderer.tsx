import { UmbracoContentPageRowRenderer } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-content-page-row-renderer';
import type { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';

export interface UmbracoContentPageRendererProps {
  contentPage: UmbracoContentPage;
  isGuest?: boolean;
}
export function UmbracoContentPageRenderer({
  contentPage,
  isGuest,
}: UmbracoContentPageRendererProps) {
  const elements = Array.isArray(contentPage.content)
    ? contentPage.content
    : [contentPage.content];
  return (
    <>
      {elements.map((element, index) => (
        <UmbracoContentPageRowRenderer key={index} item={element} isGuest={isGuest}/>
      ))}
    </>
  );
}
