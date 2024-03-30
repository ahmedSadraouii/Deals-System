export interface UmbracoDeal {
  id: string;
  name: string;
  contentType: 'deal';
  createdDate: string; // iso-date
  updateDate: string; // iso-date
  route: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
  properties: {};
}

export interface UmbracoRichTextElement {
  tag: '#root' | string;
  attributes?: Record<string, string>;
  text?: string;
  elements?: Array<UmbracoRichTextElement>;
  blocks?: Array<unknown>;
}

export type UmbracoContentPageContentItem =
  | {
      type: 'umbBlockGridDemoHeadlineBlock';
      properties: {
        headline: string;
      };
    }
  | {
      type: 'heroDealsSlider';
      properties: {
        title: string;
        deals: Array<UmbracoDeal>;
      };
    }
  | {
      type: 'umbBlockGridDemoRichTextBlock';
      properties: {
        richText: UmbracoRichTextElement;
      };
    };

export interface UmbracoContentPage {
  content: Array<{
    gridColumns: number;
    items: Array<{
      rowSpan: number;
      columnSpan: number;
      areaGridColumns: number;
      areas: Array<any>;
      content: UmbracoContentPageContentItem;
      settings: null;
    }>;
  }>;
}
