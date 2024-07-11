'use client';

import React from 'react';
import Link from 'next/link';
import { trackLinkClick } from '@/utils/tracking';

export function FooterLegalLinks() {
  const handleLinkClick =
    (linkName: string, targetUrl: string) =>
    (_: React.MouseEvent<HTMLAnchorElement>) => {
      trackLinkClick(linkName, targetUrl);
    };

  return (
    <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 pt-4 md:border-b-0">
      <ul className="flex h-full flex-col gap-4 md:mx-0 md:flex-row md:items-end">
        <li>
          <Link
            href="#"
            className="text-nowrap hover:underline"
            onClick={handleLinkClick('cookieEinstellungen', '#')}
          >
            Cookie-Einstellungen
          </Link>
        </li>
        <li>
          <Link
            href="/content/datenschutz"
            className="hover:underline"
            onClick={handleLinkClick('datenschutz', '/content/datenschutz')}
          >
            Datenschutz
          </Link>
        </li>
        <li>
          <Link
            href="/content/impressum"
            className="hover:underline"
            onClick={handleLinkClick('impressum', '/content/impressum')}
          >
            Impressum
          </Link>
        </li>
        <li>
          <Link
            href="/content/nutzungsbedingungen"
            className="hover:underline"
            onClick={handleLinkClick(
              'nutzungsbedingungen',
              '/content/nutzungsbedingungen',
            )}
          >
            Nutzungsbedingungen
          </Link>
        </li>
        <li>
          <Link
            href="/content/widerruf"
            className="hover:underline"
            onClick={handleLinkClick('widerruf', '/content/widerruf')}
          >
            Widerruf
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterLegalLinks;