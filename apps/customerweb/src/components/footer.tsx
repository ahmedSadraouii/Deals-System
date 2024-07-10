import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

export async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="border-t border-secondary/10 bg-neutral-100">
        <div className="container mx-auto w-full p-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold">
                  Du brauchst Hilfe? Unser Kundendienst hilft gerne!
                </h2>
              </div>
            </div>

            <div className="md:flex">
              <a
                href="mailto:kundenservice@aldideals.de"
                className="flex items-center rounded-full bg-slate-900 px-6 py-3 text-white hover:underline"
              >
                <img
                  src="/icons/mail-footer-icon.svg"
                  alt="email icon"
                  className="float-left mr-3 fill-white stroke-white text-white"
                />{' '}
                kontakt@kundenservice.aldi-sued.de
              </a>
              <a
                href="mailto:kundenservice@aldideals.de"
                className="mt-5 flex items-center rounded-full bg-slate-900 px-6 py-3 text-white hover:underline md:ml-4 md:mt-0"
              >
                <img
                  src="/icons/info-icon.svg"
                  alt="email icon"
                  className="float-left mr-3 fill-white stroke-white text-white"
                />{' '}
                Häufig gestellte Fragen
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-secondary text-white">
        <div className="mx-auto w-full py-16 md:container md:p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <div className="hidden md:block">
                <Link href="/">
                  <Image
                    src="/logos/aldi-logo.svg"
                    height={100}
                    width={100}
                    className="me-3 h-[10rem]"
                    alt="FlowBite Logo"
                  />
                </Link>
              </div>
              <div className="mb-6 md:mb-0">
                <Link href="/">
                  <Image
                    src="/logos/aldi-fire.svg"
                    height={100}
                    width={100}
                    className="h-[10rem] w-48"
                    alt="FlowBite Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 md:border-b-0	">
                <div>
                  <h2 className="mb-4 text-3xl font-[450]">Navigation</h2>
                  <ul>
                    <li className="mb-4 text-neutral-50">
                      <Link href="/" className="hover:underline">
                        Start
                      </Link>
                    </li>
                    <li className="mb-4 text-neutral-50">
                      <Link href="/auth" className="hover:underline">
                        Anmelden
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/auth" className="hover:underline">
                        Registrieren
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/content/faq" className="hover:underline">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 md:border-b-0 ">
                <div className="mr-[57px] md:mr-0">
                  <ul className="mt-12">
                    {session ? (
                      <>
                        <li className="mb-4">
                          <Link
                            href="/profile/general"
                            className="hover:underline"
                          >
                            Warenkorb
                          </Link>
                        </li>
                        <li className="mb-4">
                          <Link
                            href="/profile/general"
                            className="hover:underline"
                          >
                            Profil
                          </Link>
                        </li>
                        <li className="mb-4">
                          <Link
                            href="/profile/deals"
                            className="hover:underline"
                          >
                            Meine Deals
                          </Link>
                        </li>
                        <li className="mb-4">
                          <Link
                            href="/profile/favorites"
                            className="hover:underline"
                          >
                            Merkliste
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="mb-4">
                          <Link href="/auth" className="hover:underline">
                            Anmelden
                          </Link>
                        </li>
                        <li className="mb-4">
                          <Link href="/auth" className="hover:underline">
                            Registrieren
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-4 pt-4 md:border-b-0">
              <ul className="flex h-full flex-col gap-4 md:mx-0 md:flex-row md:items-end">
                <li>
                  <Link href="#" className="text-nowrap hover:underline">
                    Cookie-Einstellungen
                  </Link>
                </li>
                <li>
                  <Link href="/content/datenschutz" className="hover:underline">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/content/impressum" className="hover:underline">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/content/nutzungsbedingungen"
                    className="hover:underline"
                  >
                    Nutzungsbedingungen
                  </Link>
                </li>
                <li>
                  <Link href="/content/widerruf" className="hover:underline">
                    Widerruf
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 justify-center sm:flex sm:items-center">
            <span className="text-sm text-white">
              &copy; 2024{' '}
              <Link href="/" className="hover:underline">
                Aldi-Deals&trade;
              </Link>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
