import { ErrorPage } from '@/components/error-page';
import { LoadingSvg } from '@/components/svg/loading-svg';

export function CartLoading() {
  return (
    <ErrorPage
      title="Einen Augenblick bitte"
      description={
        <div className="flex flex-row items-center gap-4">
          <span>Warenkorb wird geladen...</span>
          <LoadingSvg className="animate-spin" />
        </div>
      }
    />
  );
}
