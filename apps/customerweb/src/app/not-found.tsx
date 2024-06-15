import { ErrorPage } from '@/components/error-page';

export default function NotFound() {
  return (
    <ErrorPage
      title="Seite nicht gefunden"
      description="Die Seite, die Sie suchen, existiert nicht. Bitte überprüfen Sie die URL und versuchen Sie es erneut."
      back={{
        link: '/',
        text: 'Zur Startseite zurück',
      }}
    />
  );
}
