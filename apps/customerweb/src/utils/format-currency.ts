export function formatCurrency(price: number, showDigits: boolean = false) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: showDigits ? 2 : 0,
    maximumFractionDigits: showDigits ? 2 : 0,
  }).format(price);
}
