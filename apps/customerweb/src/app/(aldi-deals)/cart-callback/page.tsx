import { ThankYouPage } from '@/app/(aldi-deals)/cart/components/thank-you-page';
import { ErrorPage } from '@/components/error-page';
import { ClientToast } from '@/utils/client-toast';
import { getCartsApiClient } from '@/utils/deals-api-client';

export default async function Page({
  searchParams: { orderId, RETURNMAC, hostedCheckoutId },
}: {
  searchParams: {
    orderId: string;
    RETURNMAC: string;
    hostedCheckoutId: string;
  };
}) {
  if (!orderId || !RETURNMAC || !hostedCheckoutId) {
    return (
      <ErrorPage
        title="Ungültige Anfrage"
        description="Die Anfrage ist ungültig."
        back={{
          link: '/',
          text: 'Zurück zur Startseite',
        }}
        inline={true}
      />
    );
  }

  const cartApi = getCartsApiClient({});

  try {
    const confirmPaymentResponse = await cartApi.confirmCheckout({
      cartId: orderId,
      returnMac: RETURNMAC,
      hostedCheckoutId,
    });

    const isSuccessful = confirmPaymentResponse.paymentStatus === 'captured';

    if (!isSuccessful) {
      return (
        <>
          <ClientToast
            title="Zahlung fehlgeschlagen"
            description={`Fehlercode: ${confirmPaymentResponse.paymentStatus}`}
          />
          <ErrorPage
            title="Zahlung fehlgeschlagen"
            description="Die Zahlung ist fehlgeschlagen."
            back={{
              link: '/cart',
              text: 'Zurück zum Warenkorb',
            }}
            inline={true}
          />
        </>
      );
    }

    return <ThankYouPage orderModel={confirmPaymentResponse.order} />;
  } catch (error) {
    return (
      <ErrorPage
        title="Ungültige Anfrage"
        description="Die Anfrage ist ungültig."
        back={{
          link: '/',
          text: 'Zurück zur Startseite',
        }}
        inline={true}
      />
    );
  }

  return;
}
