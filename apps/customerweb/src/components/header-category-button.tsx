'use client';

import type { ReactNode } from 'react';
import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { IconTicket } from '@/components/svg/icon-ticket';

export interface HeaderCategoryButtonProps {
  children: ReactNode;
}

export function HeaderCategoryButton({ children }: HeaderCategoryButtonProps) {
  return (
    <Dropdown triggerScaleOnOpen={false}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="category-1"
          description="Beschreibung 1"
          startContent={<IconTicket className="text-aldi-blue" />}
        >
          Kategorie 1
        </DropdownItem>
        <DropdownItem
          key="category-2"
          description="Beschreibung 2"
          startContent={<IconTicket className="text-aldi-blue" />}
        >
          Kategorie 2
        </DropdownItem>
        <DropdownItem
          key="category-3"
          description="Beschreibung 3"
          startContent={<IconTicket className="text-aldi-blue" />}
        >
          Kategorie 3
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
