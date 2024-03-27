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
          description={<span className="text-sm">Beschreibung 1</span>}
          startContent={<IconTicket className="text-5xl text-aldi-blue" />}
        >
          <span className="text-xl">Kategorie 1</span>
        </DropdownItem>

        <DropdownItem
          key="category-2"
          description={<span className="text-sm">Beschreibung 2</span>}
          startContent={<IconTicket className="text-5xl text-aldi-blue" />}
        >
          <span className="text-xl">Kategorie 2</span>
        </DropdownItem>

        <DropdownItem
          key="category-3"
          description={<span className="text-sm">Beschreibung 31</span>}
          startContent={<IconTicket className="text-5xl text-aldi-blue" />}
        >
          <span className="text-xl">Kategorie 3</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
