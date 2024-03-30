import type { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-types';

export type UmbracoRendererProps = {
  type: 'contentPage';
  contentPage: UmbracoContentPage;
};

export function UmbracoRenderer(props: UmbracoRendererProps) {
  // todo: render the content page
  return (
    <pre className="whitespace-pre-wrap">
      Type: {props.type}
      <br />
      Content: {JSON.stringify(props.contentPage, null, 2)}
    </pre>
  );
}
