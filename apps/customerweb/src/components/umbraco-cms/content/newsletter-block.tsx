import React from 'react';
import Image from 'next/image';
import FooterForm from '@/components/footer/footer-form';

export function NewsletterBlock() {
  return (
    <div className="container mx-auto mb-16 w-full">
      <div className="grid min-h-[700px] grid-cols-1 rounded-3xl bg-indigo-900 md:grid-cols-2">
        <div
          className="!bg-cover !bg-center"
          style={{ background: 'url("/img_2.png")' }}
        />
        <div className="flex items-center justify-center p-20">
          <div className="w-full rounded-3xl bg-[#364084] p-10">
            <h1 className="text-sm text-white">
              Nie wieder einen Deal verpassen!
            </h1>
            <h2 className="text-2xl text-white">
              Jetzt zum Newsletter anmelden
            </h2>
            <ul className="mt-5">
              <li className="flex items-center text-white">
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
