import { Card, CardBody } from '@nextui-org/react';

export function NotAvailableCartItem() {
  return (
    <Card className=" bg-orange-200 ">
      <CardBody>
        <p className="text-orange-600">
          Dieser Deal ist leider abgelaufen! Er wird im Checkout Prozess und für
          den Gesamtpreis nicht beachtet.
        </p>
      </CardBody>
    </Card>
  );
}
