'use client';

import React from 'react';
import Link from 'next/link';
import { trackLinkClick } from '@/utils/tracking';

export default function NoSessionFooter() {
  const handleLinkClick =
    (linkName: string, targetUrl: string) =>
    (_: React.MouseEvent<HTMLAnchorElement>) => {
      trackLinkClick(linkName, targetUrl);
    };

  return (
    <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 md:border-b-0">
      <div className="mr-[57px] md:mr-0">
        <ul className="mt-12">
          <li className="mb-4">
            <Link
              href="/profile/general"
              className="hover:underline"
              onClick={handleLinkClick('warenkorb', '/profile/general')}
            >
              Warenkorb
            </Link>
          </li>
          <li className="mb-4">
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
        </ul>
      </div>
    </div>
  );
}
