'use client';

import React from 'react';
import Link from 'next/link';
import { trackNavigationClick } from '@/utils/tracking';

export function FooterNavigation() {
  const handleLinkClick =
    (navigationItem: string) => (_: React.MouseEvent<HTMLAnchorElement>) => {
      trackNavigationClick(navigationItem);
    };

  return (
    <div className="flex flex-col items-center justify-center border-b border-slate-100 border-opacity-10 pb-4 md:border-b-0">
      <div>
        <h2 className="mb-4 text-3xl font-[450]">Navigation</h2>
        <ul className="text-center">
          <li className="mb-4 text-neutral-50">
            <Link
              href="/"
              className="hover:underline"
              onClick={handleLinkClick('start')}
            >
              Start
            </Link>
          </li>
          <li className="mb-4 text-neutral-50">
            <Link
              href="/auth"
              className="hover:underline"
              onClick={handleLinkClick('anmelden')}
            >
              Anmelden
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/auth"
              className="hover:underline"
              onClick={handleLinkClick('registrieren')}
            >
              Registrieren
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/content/faq"
              className="hover:underline"
              onClick={handleLinkClick('faq')}
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
