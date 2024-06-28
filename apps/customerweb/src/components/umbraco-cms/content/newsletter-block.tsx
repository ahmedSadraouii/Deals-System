import React from 'react';
import Image from 'next/image';
import FooterForm from '@/components/footer/footer-form';

export function NewsletterBlock() {
  return (
    <div className="container mx-auto mb-16 w-full px-4">
      <div className="grid min-h-[700px] rounded-3xl bg-gradient-to-r from-blue-900 via-purple-800 to-purple-400 lg:grid-cols-2">
        <div
          className="hidden h-full w-full !bg-cover !bg-center lg:block"
          style={{ background: 'url("/img_2.png")' }}
        />
        <Image
          src="/img_2.png"
          width={250}
          height={250}
          alt=""
          className="mx-auto flex w-full md:hidden"
        />

        <div className="flex items-center justify-center md:p-20">
          <div className="w-full bg-opacity-50 p-4 md:rounded-3xl md:bg-[#364084] md:p-10 md:backdrop-blur-md">
            <h1 className="text-sm text-white">
              Nie wieder einen Deal verpassen!
            </h1>
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Jetzt zum Newsletter anmelden
            </h2>
            <ul className="mt-2 md:mt-5">
              <li className="mb-2 flex items-center text-white">
                <Image
                  src="/icons/login-check-icon.svg"
                  width={32}
                  height={32}
                  alt=""
                  className="mr-3"
                />
                Kostenlos, unverbindlich und jederzeit löschbar!
              </li>
              <li className="flex items-center text-white">
                <Image
                  src="/icons/login-check-icon.svg"
                  width={32}
                  height={32}
                  alt=""
                  className="mr-3"
                />
                Neue Angebote, Sonderaktionen und Deals – nichts mehr verpassen!
              </li>
            </ul>
            <FooterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
