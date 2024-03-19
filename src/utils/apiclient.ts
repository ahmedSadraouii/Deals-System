import { getServerSession } from 'next-auth';
import type { CancelablePromise, IApiContentResponseModel } from '@/apiclient';
import { ContentResource, OpenAPI } from '@/apiclient';
import { authOptions } from '@/utils/auth';

export async function getApiResource(path: string) {
  'use server';
  const session = await getServerSession(authOptions);

  if (session === null) {
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.WEBAPI_BASEURL}${path}`,
      /* {
        headers: {
          Authorization: `Bearer ${session.token.accessToken}`
        },
      } */
    );

    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function getDeal(dealId: string): Promise<DealModel> {
  'use server';
  return await getApiResource(`/customapi/deals/${dealId}`);
}

export async function getDeals(): Promise<DealModel> {
  'use server';
  return await getApiResource(`/customapi/deals`);
}

export async function getContentItem(idOrPath: string): Promise<any> {
  'use server';
  return await getApiResource(
    `/umbraco/delivery/api/v1/content/item/${idOrPath}`,
  );
}

export interface DealModel {
  id: string;
  title: string;
  description: string;
  price: number;
  priceOld: number;
  count: number;
}

function setBaseUrl() {
  if (!process.env.WEBAPI_BASEURL) {
    throw Error('WEBAPI_BASEURL has to be set');
  }

  OpenAPI.BASE = process.env.WEBAPI_BASEURL;
}

function getContentById(
  id: string,
): CancelablePromise<IApiContentResponseModel> {
  setBaseUrl();

  const content = ContentResource.getContentItemById20({
    id,
  });

  return content;
}
