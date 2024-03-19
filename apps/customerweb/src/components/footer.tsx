import FooterForm from "@/components/footer/footer-form";
import React from "react";
import Image from 'next/image';
import {FooterSlider} from "@/components/footer/footer-slider";

export function Footer() {
  return (
    <>
      <FooterSlider name="Angebote unserer ALDI Möglichkeiten" bg="white"/>


      <div className="container mx-auto w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-indigo-900 rounded-3xl min-h-[700px]">
          <div className="!bg-center !bg-cover" style={{background: 'url("/img_2.png")'}}></div>
          <div className="flex items-center justify-center p-20">
            <div className="w-full p-10 bg-[#364084] rounded-3xl">
              <h1 className="text-white text-sm">Nie wieder einen Deal verpassen!</h1>
              <h2 className="text-2xl text-white">Jetzt zum Newsletter anmelden</h2>
              <ul className="mt-5">
                <li className="text-white flex items-center">
                  <Image
                    src="/icons/login-check-icon.svg"
                    width={30}
                    height={70}
                    alt="aldi sport logo"
                    className="mr-3"
                  />
                  Kostenlos, unverbindlich und jederzeit löschbar!
                </li>
                <li className="text-white flex items-center">
                  <Image
                    src="/icons/login-check-icon.svg"
                    width={30}
                    height={70}
                    alt="aldi sport logo"
                    className="mr-3"
                  />
                  Neue Angebote, Sonderaktionen und Deals – nichts mehr verpassen!
                </li>
              </ul>
              <FooterForm/>
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
                className="hover:underline bg-slate-900 flex items-center px-6 py-3 rounded-full text-white"
              >
                <img
                  src="/icons/mail-footer-icon.svg"
                  alt="email icon"
                  className="float-left mr-3 text-white fill-white stroke-white"
                />{' '}
                kontakt@kundenservice.aldi-sued.de
              </a>
              <a
                href="mailto:kundenservice@aldideals.de"
                className="hover:underline bg-slate-900 flex items-center px-6 py-3 rounded-full text-white md:ml-4 mt-5 md:mt-0"
              >
                <img
                  src="/icons/info-icon.svg"
                  alt="email icon"
                  className="float-left mr-3 text-white fill-white stroke-white"
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
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700"/>
          <div className="justify-center sm:flex sm:items-center">
            <span className="text-sm text-gray-600">
              &copy; 2023{' '}
              <a href="/" className="hover:underline">
                Aldi-Deals&trade;
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
