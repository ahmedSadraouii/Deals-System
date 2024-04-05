import React from 'react';
import { DealsListBlock } from '@/components/umbraco-cms/content/deals-list-block';
import { HeadlineBlock } from '@/components/umbraco-cms/content/headline-block';
import { ImagesBlock } from '@/components/umbraco-cms/content/images-block';
import { NewsletterBlock } from '@/components/umbraco-cms/content/newsletter-block';
import { OffersBlock } from '@/components/umbraco-cms/content/offers-block';
import { PartnersBlock } from '@/components/umbraco-cms/content/partners-block';
import { convertToHtml } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-rich-text-utils';
import type { UmbracoContentPageContentItem } from '@/components/umbraco-cms/umbraco-types';

export interface UmbracoContentPageContentItemRendererProps {
  item: UmbracoContentPageContentItem;
}

export function UmbracoContentPageContentItemRenderer({
  item,
}: UmbracoContentPageContentItemRendererProps) {
  const contentType = item.contentType;
  if (contentType === 'richTextBlock') {
    return (
      <section
        className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--richTextBlock"
        dangerouslySetInnerHTML={{
          __html: convertToHtml(item.properties.richText),
        }}
      />
    );
  } else if (contentType === 'headlineBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--headlineBlock">
        <HeadlineBlock headline={item.properties.headline} />
      </section>
    );
  } else if (contentType === 'imageBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--imageBlock">
        <ImagesBlock images={item.properties.image} />
      </section>
    );
  } else if (contentType === 'partnersBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--partnersBlock">
        <PartnersBlock />
      </section>
    );
  } else if (contentType === 'offersBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--offersBlock">
        <OffersBlock />
      </section>
    );
  } else if (contentType === 'newsletterBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--newsletterBlock">
        <NewsletterBlock />
      </section>
    );
  } else if (contentType === 'dealsListBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--dealsListBlock">
        <DealsListBlock
          deals={item.properties.deals || []}
          display={item.properties.uiHint}
        />
      </section>
    );
  }
  return (
    <div className="m-4 bg-danger p-4 text-white">
      <div className="text-3xl">Unknown contentType</div>
      <p>{contentType}</p>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}
