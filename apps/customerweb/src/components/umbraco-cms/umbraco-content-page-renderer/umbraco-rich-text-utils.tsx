import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import type { UmbracoRichTextElement } from '@/components/umbraco-cms/umbraco-types';

function interceptAttributeValue(key: string, value: string): string {
  if (key === 'src' && value.startsWith('/media/')) {
    return defaultLoader({
      src: `https://dev.api.aldi.amplicade.com/umbraco/${value}`,
      width: 1024,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  } else if (
    key === 'src' &&
    value.indexOf('dev.api.aldi.amplicade.com/media') !== -1
  ) {
    return defaultLoader({
      src: value.replace(
        'dev.api.aldi.amplicade.com/media',
        'dev.api.aldi.amplicade.com/umbraco/media',
      ),
      width: 1024,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  }
  return value;
}

export function convertToHtml(
  elements: UmbracoRichTextElement | Array<UmbracoRichTextElement>,
): string {
  const elementArray = Array.isArray(elements) ? elements : [elements];
  return elementArray
    .map((element, index) => {
      if (element.tag === '#root') {
        if (!element.elements || element.elements.length === 0) {
          throw new Error('Expected elements on #root element');
        }
        return convertToHtml(element.elements);
      } else if (element.tag === '#text') {
        return element.text;
      } else {
        const attributesString = Object.entries(
          element.attributes || {},
        ).reduce((acc, [key, value]) => {
          const actualValue = interceptAttributeValue(key, value);
          return `${acc} ${key}="${actualValue}"`;
        }, '');
        return `<${element.tag}${attributesString}>${convertToHtml(element.elements || [])}</${element.tag}>`;
      }
    })
    .join('');
}
