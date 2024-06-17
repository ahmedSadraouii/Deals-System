import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

export async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="border-t border-secondary/10 bg-gray-100">
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
              {/*<a
                href="mailto:kundenservice@aldideals.de"
                className="mt-5 flex items-center rounded-full bg-slate-900 px-6 py-3 text-white hover:underline md:ml-4 md:mt-0"
              >
                <img
                  src="/icons/info-icon.svg"
                  alt="email icon"
                  className="float-left mr-3 fill-white stroke-white text-white"
                />{' '}
                Häufig gestellte Fragen
              </a>*/}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-secondary text-white">
        <div className="container mx-auto w-full p-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-6 md:mb-0">
                <a href="/" className="flex items-center">
                  <img
                    src="/logo-white.svg"
                    className="me-3 h-24"
                    alt="FlowBite Logo"
                  />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h2 className="mb-6 text-xl font-bold">Navigation</h2>
                <ul>
                  <li className="mb-4 text-gray-50">
                    <a href="/" className="hover:underline">
                      Start
                    </a>
                  </li>
                  <li className="mb-4 text-gray-50">
                    <a href="/cart" className="hover:underline">
                      Warenkorb
                    </a>
                  </li>
                  {/*<li className="mb-4">
                    <a href="#" className="hover:underline">
                      Kategorien
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Aktuelles
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Hilfe & Support
                    </a>
                  </li>*/}
                </ul>
              </div>
              <div>
                <ul className="mt-12">
                  {session ? (
                    <>
                      <li className="mb-4">
                        <a href="/profile/general" className="hover:underline">
                          Profil
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="/profile/deals" className="hover:underline">
                          Meine Deals
                        </a>
                      </li>
                      <li className="mb-4">
                        <a
                          href="/profile/favorites"
                          className="hover:underline"
                        >
                          Meine Favoriten
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Anmelden
                        </a>
                      </li>
                      <li className="mb-4">
                        <a href="#" className="hover:underline">
                          Registrieren
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 justify-center sm:flex sm:items-center">
            <span className="text-sm text-gray-600">
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
