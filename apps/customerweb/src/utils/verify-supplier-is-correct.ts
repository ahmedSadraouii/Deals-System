import type { UmbracoSupplier } from '@/components/umbraco-cms/umbraco-types';

export function verifySupplierIsCorrect(supplier: UmbracoSupplier): boolean {
  // all the mandatory fields required on a deal object
  const requiredFields = [
    supplier.id,
    supplier.name,
    supplier.createDate,
    supplier.route.path,
    supplier.properties?.picture,
    supplier.properties?.picture?.[0]?.url,
  ];
  return requiredFields.every((field) => field !== undefined && field !== null);
}
