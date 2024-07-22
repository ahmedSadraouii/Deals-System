'use client';

import React from 'react';
import Link from 'next/link';
import { trackLinkClick } from '@/utils/tracking';

export default function SessionFooter() {
  const handleLinkClick =
    (linkName: string, targetUrl: string) =>
    (_: React.MouseEvent<HTMLAnchorElement>) => {
      trackLinkClick(linkName, targetUrl);
    };
  return (
    <div className="flex flex-col items-center justify-center border-b border-slate-100 border-opacity-10 pb-4 md:border-b-0">
      <div>
        <ul className="mt-12">
          <li className="mb-4">
            <Link
              href="/profile/general"
              className="hover:underline"
              onClick={handleLinkClick('profil', '/profile/general')}
            >
              Profil
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/profile/deals"
              className="hover:underline"
              onClick={handleLinkClick('meineDeals', '/profile/deals')}
            >
              Meine Deals
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/profile/favorites"
              className="hover:underline"
              onClick={handleLinkClick('merkliste', '/profile/favorites')}
            >
              Merkliste
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
