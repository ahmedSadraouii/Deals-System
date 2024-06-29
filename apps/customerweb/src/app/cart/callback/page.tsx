import { ErrorPage } from '@/components/error-page';

export default function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  return (
    <ErrorPage
      title="Bitte warten"
      description="Ihre Anfrage wird bearbeitet. Bitte warten Sie einen Moment."
      inline={true}
    />
  );
}
