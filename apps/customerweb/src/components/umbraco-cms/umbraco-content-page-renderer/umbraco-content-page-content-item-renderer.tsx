import React from 'react';
import type { ContentApi } from 'api-content';
import { DealsListBlock } from '@/components/umbraco-cms/content/deals-list-block';
import { HeadlineBlock } from '@/components/umbraco-cms/content/headline-block';
import { ImagesBlock } from '@/components/umbraco-cms/content/images-block';
import { NewsletterBlock } from '@/components/umbraco-cms/content/newsletter-block';
import { OffersBlock } from '@/components/umbraco-cms/content/offers-block';
import { PartnersBlock } from '@/components/umbraco-cms/content/partners-block';
import { convertToHtml } from '@/components/umbraco-cms/umbraco-content-page-renderer/umbraco-rich-text-utils';
import type {
  UmbracoContentPageContentItem,
  UmbracoDeal,
} from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export interface UmbracoContentPageContentItemRendererProps {
  item: UmbracoContentPageContentItem;
}

async function getDeals(
  dataHint: 'Hand Picked' | 'All Deals' | 'Best Sellers',
  contentItemDeals: Array<UmbracoDeal>,
  contentApi: ContentApi,
): Promise<Array<UmbracoDeal>> {
  if (dataHint === 'All Deals' || dataHint === 'Best Sellers') {
    const deals = await contentApi.getContent20({
      filter: ['contentType:deal'],
    });
    return deals.items as Array<UmbracoDeal>;
  }
  return contentItemDeals; // by default
}

export async function UmbracoContentPageContentItemRenderer({
  item,
}: UmbracoContentPageContentItemRendererProps) {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  const contentType = item.contentType;
  if (contentType === 'richTextBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--richTextBlock">
        <div
          className="container mx-auto"
          dangerouslySetInnerHTML={{
            __html: convertToHtml(item.properties.richText),
          }}
        />
      </section>
    );
  } else if (contentType === 'headlineBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--headlineBlock">
        <div className="container mx-auto">
          <HeadlineBlock headline={item.properties.headline} />
        </div>
      </section>
    );
  } else if (contentType === 'imageBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--imageBlock">
        <div className="container mx-auto">
          <ImagesBlock images={item.properties.image} />
        </div>
      </section>
    );
  } else if (contentType === 'partnersBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--partnersBlock">
        <div className="container mx-auto">
          <PartnersBlock />
        </div>
      </section>
    );
  } else if (contentType === 'offersBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--offersBlock">
        <div className="container mx-auto">
          <OffersBlock />
        </div>
      </section>
    );
  } else if (contentType === 'newsletterBlock') {
    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--newsletterBlock">
        <div className="container mx-auto">
          <NewsletterBlock />
        </div>
      </section>
    );
  } else if (contentType === 'dealsListBlock') {
    const dataHint = item.properties.dataHint;
    const deals = await getDeals(
      dataHint,
      item.properties.deals || [],
      contentApi,
    );

    return (
      <section className="umbraco-content-page-content-item-section umbraco-content-page-content-item-section--dealsListBlock">
        <DealsListBlock deals={deals} display={item.properties.uiHint} />
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
