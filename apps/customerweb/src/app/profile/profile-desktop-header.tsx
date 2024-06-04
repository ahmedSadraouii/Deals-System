'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconHeart } from '@/components/svg/icon-heart';
import { IconUser } from '@/components/svg/icon-user';

export function ProfileDesktopHeader() {
  // get pathname
  const pathname = usePathname();

  const routes = [
    {
      title: 'Profil',
      startContent: <IconUser />,
      link: '/profile/personal-information',
    },
    {
      title: 'Meine Deals',
      startContent: <IconUser />,
      link: '/profile/orders',
    },
    {
      title: 'Merkliste',
      startContent: <IconHeart />,
      link: '/profile/saved-deals',
    },
  ];

  return (
    <div className="flex flex-row justify-center space-x-4">
      {routes.map((route) => (
        <AldiButton
          key={route.link}
          variant={pathname === route.link ? 'solid' : 'ghost'}
          startContent={route.startContent}
          as={Link}
          color="secondary"
          href={route.link}
        >
          {route.title}
        </AldiButton>
      ))}
    </div>
  );
}
