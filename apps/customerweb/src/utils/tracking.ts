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
}

export function trackLinkClick(linkName: string, targetUrl: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'link_click',
    eventInfo: {
      name: 'link_click',
      eventAction: linkName.toLowerCase(),
      type: 'interaction',
      effect: targetUrl.toLowerCase(),
      category: {
        primaryCategory: 'link',
      },
    },
  });
}

export function trackVoucherSubmit(dealName: string, supplierName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'voucher_submit_successful',
    name: 'voucher_submit_successful',
    eventAction: dealName.toLowerCase(),
    type: 'interaction',
    category: {
      primaryCategory: 'form',
      subCategory: supplierName.toLowerCase(),
    },
  });
}
export function trackVoucherError(cause: string, effect: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'voucher_submit_error',
    eventInfo: {
      name: 'voucher_submit_error',
      eventAction: 'voucher_error',
      type: 'error',
      cause: cause,
      effect: effect,
      category: {
        primaryCategory: 'form',
        subCategory: 'voucher',
      },
    },
  });
}
export function trackNavigationClick(navigationItem: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'navigation_item_click',
    eventInfo: {
      name: 'navigation_item_click',
      eventAction: navigationItem.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'navigation',
      },
    },
  });
}

export function trackAddToCart(partnerName: string, dealName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'add_to_cart',
    eventInfo: {
      name: 'add_to_cart',
      eventAction: partnerName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'checkout',
        subCategory: dealName.toLowerCase(),
      },
    },
  });
}

export function trackCheckoutStep1(partnerName: string, dealName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'checkout_step_1',
    eventInfo: {
      name: 'checkout_step_1',
      eventAction: partnerName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'checkout',
        subCategory: dealName.toLowerCase(),
      },
    },
  });
}
export function trackCheckoutStep2(partnerName: string, dealName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'checkout_step_2',
    eventInfo: {
      name: 'checkout_step_2',
      eventAction: partnerName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'checkout',
        subCategory: dealName.toLowerCase(),
      },
    },
  });
}
export function trackCheckoutStep3(partnerName: string, dealName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'checkout_step_3',
    eventInfo: {
      name: 'checkout_step_3',
      eventAction: partnerName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'checkout',
        subCategory: dealName.toLowerCase(),
      },
    },
  });
}
export function trackCheckoutStep4(partnerName: string, dealName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'checkout_step_4',
    eventInfo: {
      name: 'checkout_step_4',
      eventAction: partnerName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'checkout',
        subCategory: dealName.toLowerCase(),
      },
    },
  });
}

export function trackFormSend(formName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'raffle_form_send',
    eventInfo: {
      name: 'raffle_form_send',
      eventAction: 'raffle_form_send',
      type: 'success',
      category: {
        primaryCategory: 'form',
        subCategory: formName.toLowerCase(),
      },
    },
  });
}

export function trackOfferClick(dealName: string, partnerName: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'offer_click',
    eventInfo: {
      name: 'offer_click',
      eventAction: dealName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'deal_cells',
        subCategory: partnerName.toLowerCase(),
      },
    },
  });
}

export function trackLogoClick(altText: string) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'logo_click',
    eventInfo: {
      name: 'logo_click',
      eventAction: altText.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'logo',
      },
    },
  });
}
