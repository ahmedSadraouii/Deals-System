import { UmbracoContentPageRenderer } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-content-page-renderer';
import type { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';

export type UmbracoRendererProps = {
  type: 'contentPage';
  contentPage: UmbracoContentPage;
  isGuest?: boolean;
};

export function UmbracoRenderer(props: UmbracoRendererProps) {
  // todo: render the content page
  if (props.type === 'contentPage') {
    return <UmbracoContentPageRenderer contentPage={props.contentPage} isGuest={props.isGuest} />;
  }
  return (
    <pre className="whitespace-pre-wrap">
      UmbracoRenderer unknown type: {props.type}
      <br />
      Properties: {JSON.stringify(props, null, 2)}
    </pre>
  );
}
UmbracoRenderer.displayName = 'UmbracoRenderer';
