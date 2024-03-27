import type { ReadonlyURLSearchParams } from 'next/navigation';

export function createQueryString(
  query: Record<string, string>,
  searchParams?: ReadonlyURLSearchParams,
): string {
  const params = new URLSearchParams(
    !!searchParams ? searchParams.toString() : undefined,
  );

  for (const [name, value] of Object.entries(query)) {
    params.set(name, value);
  }

  return params.toString();
}
