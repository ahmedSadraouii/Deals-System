export interface UmbracoDeal {
  contentType: 'deal';
  name: string;
  createDate: Date | string; // iso-date
  updateDate: Date | string; // iso-date
  route: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
  id: string;
  properties?: {
    htmlTags: unknown;
    description: string;
    details: unknown;
    greatOffer: boolean;
    forFamily: boolean;
    outdoorActivity: boolean;
    ourRecommendation: boolean;
    perfectGift: boolean;
    pictures?: Array<UmbracoImage>;
    redeemable: boolean;
    sapArticleNo: string;
    legacyArticleNo: string;
    initialDealStock: number;
    currentDealStock: number;
    comment: unknown;
    ageRestriction: number;
    maxCustomerOrderQuantity: number;
    returnPeriod: number;
    receiptText: unknown;
    dealType: number; // unknown
    price: number;
    regularPrice: number;
    purchasePrice: number;
    vat: number;
    promotionStart: string; // iso-date
    availabilityStart: string; // iso-date
    availabilityEnd: string; // iso-date
    honorTimeStart: string; // iso-date
    honorTimeEnd: string; // iso-date
    promotionEnd: string; // iso-date
    supplierArticleNo: string;
    supplier: UmbracoSupplier;
  };
}

export interface UmbracoSupplier {
  contentType: 'supplier';
  name: string;
  createDate: Date | string; // iso-date
  updateDate: Date | string; // iso-date
  route: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
  id: string;
  properties: {
    nameFrontend: string;
    nameSystem: string;
    phone: string;
    email: string;
    emailForCustomerSupport: string;
    emailTechnicalSupport: string;
    comment: string;
    availability: 'yes' | 'no';
    picture?: Array<UmbracoImage>;
  };
}

export interface UmbracoRichTextElement {
  tag: '#root' | '#text' | string;
  attributes?: Record<string, string>;
  text?: string;
  elements?: Array<UmbracoRichTextElement>;
  blocks?: Array<unknown>;
}

export interface UmbracoImage {
  focalPoint: null;
  crops: Array<unknown>;
  id: string;
  name: string;
  mediaType: 'Image' | string;
  url: string;
  extension: string;
  width: number;
  height: number;
  bytes: number;
  properties: unknown;
}

export type UmbracoContentPageContentItem =
  | {
      contentType: 'dealsListBlock';
      properties: {
        title: string;
        dataHint: 'Hand Picked' | 'All Deals' | 'Best Sellers';
        uiHint: 'Grid' | 'Small Slider' | 'Hero Slider';
        deals?: Array<UmbracoDeal>;
      };
    }
  | {
      contentType: 'headlineBlock';
      properties: {
        headline: string;
      };
    }
  | {
      contentType: 'imageBlock';
      properties: {
        image: Array<UmbracoImage>;
      };
    }
  | {
      contentType: 'partnersBlock';
      properties: unknown;
    }
  | {
      contentType: 'offersBlock';
      properties: unknown;
    }
  | {
      contentType: 'newsletterBlock';
      properties: unknown;
    }
  | {
      contentType: 'richTextBlock';
      properties: {
        richText: UmbracoRichTextElement;
      };
    };

export interface UmbracoContentPageColumnItem {
  rowSpan: number;
  columnSpan: number;
  areaGridColumns: number;
  areas: Array<any>;
  content: UmbracoContentPageContentItem;
  settings: null;
}

export interface UmbracoContentPageRowItem {
  gridColumns: number;
  items: Array<UmbracoContentPageColumnItem>;
}

export interface UmbracoContentPage {
  content: Array<UmbracoContentPageRowItem> | UmbracoContentPageRowItem;
}
