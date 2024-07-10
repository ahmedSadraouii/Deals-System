import type { UmbracoRichTextElement } from '@/components/umbraco-cms/umbraco-types';
import { fixUmbracoMediaLink } from '@/utils/fix-umbraco-media-link';

function interceptAttributeValue(key: string, value: string): string {
  if (key === 'src') {
    return fixUmbracoMediaLink(value);
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
