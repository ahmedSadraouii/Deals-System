import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Children, cloneElement, isValidElement, useCallback } from 'react';

export interface TrackInfo {
  event: string;
  eventInfo: {
    name: string;
    eventAction: string;
    type: string;
    effect?: string;
    category: Record<string, string>;
  };
}

export interface TrackOnClickProps {
  children: ReactNode;
  track: TrackInfo;
}

export function getTrackInfoForCTA(
  ctaText: string,
  targetUrl: string,
): TrackInfo {
  return {
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
  };
}

export function getTrackInfoForOffer(
  dealName: string,
  supplierName: string,
): TrackInfo {
  return {
    event: 'offer_click',
    eventInfo: {
      name: 'offer_click',
      eventAction: dealName.toLowerCase(),
      type: 'interaction',
      category: {
        primaryCategory: 'deal_cells',
        subCategory: supplierName.toLowerCase(),
      },
    },
  };
}

export function TrackOnClick({ children, track }: TrackOnClickProps) {
  const handleClick = useCallback(() => {
    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push(track);
  }, [track]);

  // Clone children and add onClick handler
  const childrenWithOnClick = useMemo(
    () =>
      Children.map(children, (child) => {
        // Check if the child is a valid React element
        if (isValidElement(child)) {
          const handleClickProxy = () => {
            handleClick();
            if (child.props.onClick) {
              child.props.onClick();
            }
          };
          return cloneElement(child, {
            onClick: handleClickProxy,
          } as any);
        }
        return child;
      }),
    [children, handleClick],
  );

  return <>{childrenWithOnClick}</>;
}
