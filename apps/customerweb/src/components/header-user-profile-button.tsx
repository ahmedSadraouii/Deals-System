'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { BagOutlineSvg } from '@/components/svg/bag-outline-svg';
import { BookmarkOutlineSvg } from '@/components/svg/bookmark-outline-svg';
import { IconUser } from '@/components/svg/icon-user';
import { trackNavigationClick } from '@/utils/tracking';

export interface HeaderUserProfileButtonProps {
  children: ReactNode;
}

export function HeaderUserProfileButton({
  children,
}: HeaderUserProfileButtonProps) {
  const _onClickSignOut = useCallback(async () => {
    await signOut({
      redirect: true,
    });
  }, []);

  return (
    <Dropdown
      triggerScaleOnOpen={false}
      placement="bottom-end"
      classNames={{
        content: 'bg-secondary text-white rounded-md p-0',
      }}
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: 'p-4 rounded-none data-[hover=true]:bg-default/20 data-[hover=true]:text-white',
          wrapper: 'p-0',
          title: 'text-lg',
        }}
        classNames={{
          base: 'p-0',
          list: 'divide-y divide-default/20 gap-0',
        }}
      >
        <DropdownItem
          as={Link}
          href="/profile/general"
          startContent={<IconUser className="text-xl" />}
          onClick={() => trackNavigationClick('profile')}
        >
          Mein Profil
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/profile/deals"
          startContent={<BagOutlineSvg className="text-xl" />}
          onClick={() => trackNavigationClick('meine deals')}
        >
          Meine Deals
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/profile/favorites"
          startContent={<BookmarkOutlineSvg className="text-xl" />}
          onClick={() => trackNavigationClick('merkliste')}
        >
          Merkliste
        </DropdownItem>
        {/*<DropdownItem key="logout" onClick={onClickSignOut}>
          Ausloggen
        </DropdownItem>*/}
      </DropdownMenu>
    </Dropdown>
  );
}
