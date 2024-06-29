import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import defaultLoader from 'next/dist/shared/lib/image-loader';
import type { UmbracoRichTextElement } from '@/components/umbraco-cms/umbraco-types';

function interceptAttributeValue(key: string, value: string): string {
  if (key === 'src' && value.startsWith('/media/')) {
    return defaultLoader({
      src: `${process.env.CONTENT_API_BASE_URL}/${value}`,
      width: 1024,
      config: process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete,
    });
  } else if (
    key === 'src' &&
    value.indexOf(`${process.env.IMAGE_REMOST_HOSTNAME}/media`) !== -1
  ) {
    return defaultLoader({
      src: value.replace(
        `${process.env.IMAGE_REMOST_HOSTNAME}/media`,
        `${process.env.IMAGE_REMOST_HOSTNAME}/umbraco/media`,
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
    .map((element) => {
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
        return `<${element.tag}${attributesString}>${convertToHtml(
          element.elements || [],
        )}</${element.tag}>`;
      }
    })
    .join('');
}
