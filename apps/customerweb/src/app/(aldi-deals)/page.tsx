import * as React from 'react';
import { UmbracoContentPage } from '@/components/umbraco-cms/umbraco-content-page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <UmbracoContentPage path="landing-page" />;
}
