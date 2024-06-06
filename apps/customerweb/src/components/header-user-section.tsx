'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { HeaderUserProfileButton } from '@/components/header-user-profile-button';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconProfile } from '@/components/svg/icon-profile';
import { IconUser } from '@/components/svg/icon-user';

export function HeaderUserSection() {
  const session = useSession();

  if (session.data) {
    return (
      <>
        <HeaderUserProfileButton>
          <AldiButton
            size="lg"
            variant="light"
            className="cursor-pointer items-center !bg-transparent py-0"
            data-is-user-button={true}
          >
            <span className="hidden pl-4 lg:block">
              Hey {session.data.user.profile.firstName}!
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-default/40">
              <IconProfile className="text-2xl text-secondary" />
            </div>
          </AldiButton>
        </HeaderUserProfileButton>
      </>
    );
  }
  return (
    <>
      <AldiButton
        as={Link}
        size="lg"
        variant="solid"
        href="/auth"
        endContent={<IconUser className="text-2xl" />}
        color="secondary"
      >
        Anmelden
      </AldiButton>
    </>
  );
}
