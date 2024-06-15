'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AldiButton } from '@/components/nextui/aldi-button';
import { HeartOutlineSvg } from '@/components/svg/heart-outline-svg';
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
      startContent: <HeartOutlineSvg />,
      link: '/profile/saved-deals',
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      {routes.map((route) => (
        <AldiButton
          key={`${pathname}-${route.link}`}
          variant={pathname.startsWith(route.link) ? 'solid' : 'ghost'}
          startContent={route.startContent}
          as={Link}
          color={pathname.startsWith(route.link) ? 'secondary' : 'default'}
          href={route.link}
          size="lg"
        >
          {route.title}
        </AldiButton>
      ))}
    </div>
  );
}
