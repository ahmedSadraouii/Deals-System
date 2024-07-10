declare global {
  interface Window {
    adobeDataLayer: any[];
  }
}
interface PageInfo {
  pageName: string;
  pageType: string;
  primaryCategory: string;
  subCategory: string;
  subSubCategory: string;
}

export function trackCTA(ctaText: string, targetUrl: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'cta_click',
    eventInfo: {
      name: 'cta_click',
      eventAction: ctaText.toLowerCase(),
      type: 'interaction',
      effect: targetUrl,
      category: {
        primaryCategory: 'button',
      },
    },
  });
}

export function trackPageView(pageInfo: PageInfo) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'page_view',
    page: {
      pageInfo: {
        country: 'DE',
        ...pageInfo,
      },
    },
  });
  console.log('window', window.adobeDataLayer);
}
