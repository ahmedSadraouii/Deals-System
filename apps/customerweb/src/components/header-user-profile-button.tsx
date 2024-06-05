'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { DropdownItem, DropdownTrigger } from '@nextui-org/react';
import { AldiDropdown } from '@/components/nextui/aldi-dropdown';
import { AldiDropdownMenu } from '@/components/nextui/aldi-dropdown-menu';
import { BagOutlineSvg } from '@/components/svg/bag-outline-svg';
import { BookmarkOutlineSvg } from '@/components/svg/bookmark-outline-svg';
import { IconUser } from '@/components/svg/icon-user';

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
    <AldiDropdown
      triggerScaleOnOpen={false}
      placement="bottom-end"
      classNames={{
        content: 'bg-secondary text-white rounded-md p-0',
      }}
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <AldiDropdownMenu
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
          href="/profile/personal-information"
          startContent={<IconUser className="text-xl" />}
        >
          Mein Profilsss
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/profile/orders"
          startContent={<BagOutlineSvg className="text-xl" />}
        >
          Meine Deals
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/profile/saved-deals"
          startContent={<BookmarkOutlineSvg className="text-xl" />}
        >
          Merkliste
        </DropdownItem>
        {/*<DropdownItem key="logout" onClick={onClickSignOut}>
          Ausloggen
        </DropdownItem>*/}
      </AldiDropdownMenu>
    </AldiDropdown>
  );
}
