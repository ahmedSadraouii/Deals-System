import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function NotFound() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto flex flex-col space-y-4 p-5 lg:items-center lg:justify-center lg:py-32">
          <h1 className="text-5xl">Seite nicht gefunden</h1>
          <p>
            Die Seite, die Sie suchen, existiert nicht. Bitte überprüfen Sie die
            URL und versuchen Sie es erneut.
          </p>
          <div>
            <AldiButton size="lg" variant="ghost" as={Link} href={'/'}>
              Zur Startseite zurück
            </AldiButton>
          </div>
        </div>
      </section>
    </div>
  );
}
