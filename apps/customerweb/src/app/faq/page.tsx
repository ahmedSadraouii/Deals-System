import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function NotFound() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col space-y-4 p-5 lg:items-center lg:justify-center lg:py-32">
        <h1 className="text-5xl">FAQ</h1>
        <p>
          Diese Seite befindet sich noch im Aufbau. Bitte versuchen Sie es
          später erneut.
        </p>
        <div>
          <AldiButton size="lg" variant="ghost" as={Link} href={'/'}>
            Zur Startseite zurück
          </AldiButton>
        </div>
      </div>
    </section>
  );
}
