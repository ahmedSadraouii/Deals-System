import { ErrorPage } from '@/components/error-page';

export function SessionLoading() {
  return (
    <ErrorPage
      title="Einen Moment bitte"
      description="Wir verarbeiten einige Daten für dich. Bitte warte kurz."
      inline={true}
    />
  );
}
