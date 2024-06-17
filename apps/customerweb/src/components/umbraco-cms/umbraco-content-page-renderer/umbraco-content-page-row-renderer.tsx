import { UmbracoContentPageColumnRenderer } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-content-page-column-renderer';
import type { UmbracoContentPageRowItem } from '@/components/umbraco-cms/umbraco-types';

export interface UmbracoContentPageRowRendererProps {
  item: UmbracoContentPageRowItem;
}

export function UmbracoContentPageRowRenderer({
  item,
}: UmbracoContentPageRowRendererProps) {
  return (
    <div className={`grid grid-cols-${item.gridColumns}`}>
      {item.items.map((item, index) => (
        <UmbracoContentPageColumnRenderer item={item} key={index} />
      ))}
    </div>
  );
}
