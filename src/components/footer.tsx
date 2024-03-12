function Footer() {
  return (
    <>
      <div className="bg-[#FFD7D8]">
        <div className="container mx-auto w-full p-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold">Service & Kontakt</h2>
              </div>
            </div>
            <div>
              <div>
                <h2 className="mb-6 font-semibold text-2xl">Schnell selbst klären?</h2>
                <span className="font-light"><small className="text-sm"> Finde die Antwort auf deine Frage in unseren</small> <b
                  className="underline">häufig gestellten Fragen</b>.</span>
              </div>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-2xl">Brauchst du unsere Hilfe?</h2>
              <div>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="tel:+49 1803 252722" className="hover:underline">
                      <img src="/icons/phone-footer-icon.svg" alt="phone icon" className="float-start mr-3"/> +49 1803 252722
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="mailto:kundenservice@aldideals.de" className="hover:underline">
                      <img src="/icons/mail-footer-icon.svg" alt="email icon"
                           className="float-start mr-3"/> kundenservice@aldideals.de
                    </a>
                  </li>
                </ul>

              </div>
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
                  <img src="/logo-white.svg" className="h-24 me-3" alt="FlowBite Logo"/>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Sitemap</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Start</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Kategorien</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Anmelden</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Registrieren</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="text-gray-500 dark:text-gray-400 font-medium mt-11">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">Warenkorb</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Profil</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Aktuelles</a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Hilfe & Support</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Jetzt zum Newsletter
                anmelden</h2>
              <div>

                <form>
                  <label
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <input type="search" id="default-search"
                           className="block w-full p-3 ps-5 text-sm text-white rounded-full bg-[#232743] focus:ring-blue-500 focus:border-blue-500"
                           placeholder="E-mail Adresse" required/>
                    <button type="submit"
                            className="text-white absolute -end-1 -bottom-0 bg-amber-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-3">
                      Abonnieren
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
          <div className="sm:flex sm:items-center justify-center">
            <span className="text-sm text-white">
              © 2023 <a href="/" className="hover:underline">Aldi-Deals™</a>. All Rights Reserved.
            </span>

          </div>
        </div>
      </footer>

    </>
  );
}

export default Footer;
