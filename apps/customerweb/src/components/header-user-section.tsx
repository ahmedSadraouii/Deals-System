import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { HeaderUserProfileButton } from '@/components/header-user-profile-button';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconProfile } from '@/components/svg/icon-profile';
import { IconUser } from '@/components/svg/icon-user';
import { authOptions } from '@/utils/auth';

export async function HeaderUserSection() {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return (
      <>
        <HeaderUserProfileButton>
          <AldiButton
            size="lg"
            variant="light"
            className="cursor-pointer items-center !bg-transparent py-0"
            isUserButton={true}
          >
            <span className="hidden pl-4 lg:block">Hey User!</span>
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
