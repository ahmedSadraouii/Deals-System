import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterForm from '@/components/footer/footer-form';
import { FooterSlider } from '@/components/footer/footer-slider';

export function Footer() {
  return (
    <>
      <FooterSlider name="Angebote unserer ALDI Möglichkeiten" bg="white" />

      <div className="container mx-auto mb-16 w-full">
        <div className="grid min-h-[700px] grid-cols-1 rounded-3xl bg-indigo-900 md:grid-cols-2">
          <div
            className="!bg-cover !bg-center"
            style={{ background: 'url("/img_2.png")' }}
          ></div>
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
                  Neue Angebote, Sonderaktionen und Deals – nichts mehr
                  verpassen!
                </li>
              </ul>
              <FooterForm />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
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
      <footer className="bg-[#0B102F]">
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
                <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  Sitemap
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Start
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Kategorien
                    </a>
                  </li>
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
                </ul>
              </div>
              <div>
                <ul className="mt-11 font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">
                      Warenkorb
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Profil
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
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Jetzt zum Newsletter anmelden
              </h2>
              <div>
                <form>
                  <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full rounded-full bg-[#232743] p-3 ps-5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                      placeholder="E-mail Adresse"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute -bottom-0 -end-1 rounded-full bg-amber-500 px-7 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Abonnieren
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-10 justify-center sm:flex sm:items-center">
            <span className="text-sm text-gray-600">
              &copy; 2023{' '}
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
