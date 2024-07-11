'use client';

import React from 'react';
import Link from 'next/link';
import { trackLinkClick } from '@/utils/tracking';

export function FooterNavigation() {
  const handleLinkClick =
    (linkName: string, targetUrl: string) =>
    (_: React.MouseEvent<HTMLAnchorElement>) => {
      trackLinkClick(linkName, targetUrl);
    };

  return (
    <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 md:border-b-0">
      <div>
        <h2 className="mb-4 text-3xl font-[450]">Navigation</h2>
        <ul>
          <li className="mb-4 text-neutral-50">
            <Link
              href="/"
              className="hover:underline"
              onClick={handleLinkClick('start', '/')}
            >
              Start
            </Link>
          </li>
          <li className="mb-4 text-neutral-50">
            <Link
              href="/auth"
              className="hover:underline"
              onClick={handleLinkClick('anmelden', '/auth')}
            >
              Anmelden
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/auth"
              className="hover:underline"
              onClick={handleLinkClick('registrieren', '/auth')}
            >
              Registrieren
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/content/faq"
              className="hover:underline"
              onClick={handleLinkClick('faq', '/content/faq')}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterNavigation;
