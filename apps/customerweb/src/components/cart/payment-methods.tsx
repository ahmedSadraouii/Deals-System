import Image from 'next/image';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

interface PaymentMethodsProps {
  isCheckoutPage: boolean;
}
export function PaymentMethods({ isCheckoutPage }: PaymentMethodsProps) {
  return (
    <div>
      <Card className="bg-gray-100">
        {isCheckoutPage && (
          <CardHeader className="border-b pb-4">
            <p className="p-5 text-center text-aldi-blue">
              Als nächstes wirst du zum Bezahlungsprozess weitergeleitet. Dort
              kannst du deine bevorzugte Zahlungsmethode auswählen und den Kauf
              abschließen.
            </p>
          </CardHeader>
        )}
        <CardBody>
          <p className="mb-5 text-center text-aldi-blue">
            Wir unterstützen folgende Zahlungsmethoden
          </p>
          <div className="mx-auto mb-5 flex items-center gap-3">
            <Image
              src="/mastercard-logo.svg"
              alt="description"
              width={70}
              height={70}
            />
            <Image
              src="/paypal-logo.svg"
              alt="description"
              width={70}
              height={70}
            />
            <Image
              src="/visa-logo.svg"
              alt="description"
              width={70}
              height={70}
            />
            <Image
              src="/apple-pay-logo.svg"
              alt="description"
              width={70}
              height={70}
            />
            <Image
              src="/google-pay-logo.svg"
              alt="description"
              width={70}
              height={70}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
