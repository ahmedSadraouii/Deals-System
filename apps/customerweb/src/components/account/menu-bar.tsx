import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';

function MenuBar() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mr-5">
          <Button
            color="default"
            variant="bordered"
            startContent={
              <Image
                src="/icons/user-profile-icon.svg"
                width={14}
                height={14}
                alt="profil icon"
              />
            }
          >
            Profile
          </Button>
        </div>
        <div className="mr-5">
          <Button
            color="default"
            variant="bordered"
            startContent={
              <Image
                src="/icons/cart-profile-icon.svg"
                width={18}
                height={18}
                alt="profil icon"
              />
            }
          >
            Meine Deals
          </Button>
        </div>
        <div className="mr-5">
          <Button
            color="default"
            variant="bordered"
            startContent={
              <Image
                src="/icons/notification-profile-icon.svg"
                width={18}
                height={18}
                alt="profil icon"
              />
            }
          >
            Benachrichtigungen
          </Button>
        </div>
        <div className="mr-5">
          <Button
            color="default"
            variant="bordered"
            startContent={
              <Image
                src="/icons/gear-profile-icon.svg"
                width={18}
                height={18}
                alt="profil icon"
              />
            }
          >
            Weiteres
          </Button>
        </div>
      </div>
    </>
  );
}

export default MenuBar;
