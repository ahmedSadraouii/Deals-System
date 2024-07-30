import Link from 'next/link';
import { ErrorPage } from '@/components/error-page';
import { AldiButton } from '@/components/nextui/aldi-button';
import { PageViewTracking } from '@/components/tracking-page-view';

export default function NotFound() {
  const pageInfo = {
    pageName: 'aldi-deals-faq',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'faq',
  };
  return (
    <>
      <ErrorPage
        title="FAQ"
        description="Diese Seite befindet sich noch im Aufbau. Bitte versuchen Sie es später erneut."
        back={{
          link: '/',
          text: 'Zur Startseite zurück',
        }}
      />
      <PageViewTracking pageInfo={pageInfo} />
    </>
  );

  return (
    <section className="bg-neutral-50">
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
