import React from 'react';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';

const ProfileAvatar = () => {
  return (
    <div className="relative max-w-24">
      <Avatar
        name="HE"
        color="warning"
        size="lg"
        className="h-20 w-20 text-xl font-extrabold"
      />
      <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black p-2">
        <Image
          src="/icons/edit-icon.svg"
          width={14}
          height={14}
          alt="profil icon"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
