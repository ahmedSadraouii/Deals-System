import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';

export function verifyDealIsCorrect(deal: UmbracoDeal): boolean {
  // all the mandatory fields required on a deal object
  const requiredFields = [
    deal.id,
    deal.name,
    deal.createDate,
    deal.route.path,
    deal.properties?.dealId,
    deal.properties?.price,
    deal.properties?.supplier,
    deal.properties?.supplier?.id,
  ];
  return requiredFields.every((field) => field !== undefined && field !== null);
}
