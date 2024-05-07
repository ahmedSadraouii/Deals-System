import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

export default function PaymentMethods() {
  return (
    <div className="hidden md:block">
      <Card className="bg-gray-100">
        <CardBody>
          <p className="mb-5 text-center">
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
