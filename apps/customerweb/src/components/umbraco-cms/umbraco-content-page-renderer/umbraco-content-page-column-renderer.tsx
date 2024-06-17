import { UmbracoContentPageContentItemRenderer } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-content-page-content-item-renderer';
import type { UmbracoContentPageColumnItem } from '@/components/umbraco-cms/umbraco-types';

export interface UmbracoContentPageColumnRendererProps {
  item: UmbracoContentPageColumnItem;
  isGuest?: boolean;
}
export function UmbracoContentPageColumnRenderer({
  item,
  isGuest,
}: UmbracoContentPageColumnRendererProps) {
  return (
    <div className={`col-span-${item.columnSpan} row-span-${item.rowSpan}`}>
      <UmbracoContentPageContentItemRenderer item={item.content} isGuest={isGuest}/>
    </div>
  );
}
