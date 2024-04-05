import React from 'react';
import Image from 'next/image';
import type { UmbracoImage } from '@/components/umbraco-cms/umbraco-types';

function getImageUrl(url: string) {
  return `http://dev.api.aldi.amplicade.com/umbraco${url}`;
}
export interface ImagesBlockProps {
  images: Array<UmbracoImage>;
}
export function ImagesBlock({ images }: ImagesBlockProps) {
  return (
    <>
      {images.map((image, index) => (
        <Image
          key={index}
          src={getImageUrl(image.url)}
          alt={image.name}
          width={image.width}
          height={image.height}
        />
      ))}
    </>
  );
}
