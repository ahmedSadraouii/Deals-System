import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { ProductItem } from '@/components/product/product-item';

export async function SavedDeals() {
  return (
    <Card className="bg-gray-100 p-12">
      <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductItem price={250} discountPrice={200} image="/img_4.png" />
        <ProductItem price={250} discountPrice={200} image="/img_4.png" />
        <ProductItem price={250} discountPrice={200} image="/img_4.png" />
        <ProductItem price={250} discountPrice={200} image="/img_4.png" />
      </CardBody>
    </Card>
  );
}
