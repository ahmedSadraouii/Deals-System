import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function Page() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col space-y-4 p-5 lg:items-center lg:justify-center lg:py-32">
        <h1 className="text-5xl">Thank you</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy.
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
