'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UserDetailsDto } from 'api-user';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowLeft } from '@/components/svg/icon-arrow-left';
import { IconProfile } from '@/components/svg/icon-profile';

export interface ProfileMobileHeaderProps {
  userDetails: UserDetailsDto;
}

export function ProfileMobileHeader({ userDetails }: ProfileMobileHeaderProps) {
  const pathName = usePathname();
  const showBackLink = pathName !== '/profile';

  if (showBackLink) {
    return (
      <AldiButton
        as={Link}
        size="lg"
        variant="ghost"
        href="/profile"
        startContent={<IconArrowLeft className="text-2xl" />}
        color="secondary"
        fullWidth={true}
      >
        Zurück zur Übersicht
      </AldiButton>
    );
  }

  return (
    <div className="flex flex-row items-center gap-4 rounded-lg bg-gray-100 p-4 text-secondary lg:rounded-[20px]">
      <div className="shrink-0 items-center rounded-full border border-secondary/10 bg-white p-3">
        <IconProfile className="text-xl" />
      </div>
      <div className="flex flex-col leading-snug">
        <p>Schön dich zu sehen,</p>
        <h2 className="text-2xl font-bold">
          {userDetails.firstName} {userDetails.lastName}
        </h2>
      </div>
    </div>
  );
}
