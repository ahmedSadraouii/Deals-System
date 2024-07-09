import React from 'react';
import Link from 'next/link';
import { Badge } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { HeaderUserProfileButton } from '@/components/header-user-profile-button';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowDown } from '@/components/svg/icon-arrow-down';
import { IconProfile } from '@/components/svg/icon-profile';
import { IconUser } from '@/components/svg/icon-user';
import { authOptions } from '@/utils/auth';

export async function HeaderUserSection() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <Badge
          placement="bottom-right"
          color="secondary"
          classNames={{
            badge: 'w-6 h-6 text-lg',
          }}
          content={<IconArrowDown className="shrink-0" />}
        >
          <HeaderUserProfileButton>
            <AldiButton
              size="lg"
              variant="flat"
              className="cursor-pointer items-center"
              data-is-user-button={true}
            >
              <span className="hidden pl-4 lg:block">
                Hey {session.user.profile.firstName}!
              </span>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <IconProfile className="text-2xl text-secondary" />
              </div>
            </AldiButton>
          </HeaderUserProfileButton>
        </Badge>
      </>
    );
  }
  return (
    <>
      <div>
        <div className="hidden lg:block">
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
        </div>
        <div className="lg:hidden">
          <AldiButton
            as={Link}
            data-is-user-button={true}
            variant="flat"
            isIconOnly={true}
            endContent={<IconUser className="text-2xl" />}
            href="/auth"
            className="h-12 w-12 text-secondary"
          />
        </div>
      </div>
    </>
  );
}
