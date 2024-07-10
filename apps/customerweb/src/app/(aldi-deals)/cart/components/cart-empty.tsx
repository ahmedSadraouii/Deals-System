import { ErrorPage } from '@/components/error-page';

export function CartEmpty() {
  return (
    <ErrorPage
      title="Dein Warenkorb ist leer!"
      description="Dein Warenkorb ist leer! Durchstöbere jetzt alle Deals und leg los."
      back={{
        link: '/',
        text: 'Deals entdecken',
        variant: 'solid',
        color: 'secondary',
      }}
    />
  );
}
