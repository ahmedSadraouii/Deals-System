'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';

export interface HeaderUserProfileButtonProps {
  children: ReactNode;
}

export function HeaderUserProfileButton({
  children,
}: HeaderUserProfileButtonProps) {
  const onClickSignOut = useCallback(async () => {
    await signOut({
      redirect: true,
    });
  }, []);

  return (
    <Dropdown triggerScaleOnOpen={false} placement="bottom-end">
      <DropdownTrigger>
        <AldiButton
          size="lg"
          variant="light"
          className="pointer-events-auto flex cursor-pointer items-center space-x-4 !bg-transparent p-4"
        >
          {children}
        </AldiButton>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider={true}>
          <DropdownItem key="profile">Profil</DropdownItem>
        </DropdownSection>
        <DropdownItem key="logout" onClick={onClickSignOut}>
          Ausloggen
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
