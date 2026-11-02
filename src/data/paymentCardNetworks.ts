// Prefiksy i długości: https://github.com/braintree/credit-card-type/blob/main/src/lib/card-types.ts
export const paymentCardNetworks = {
  visa: { label: 'Visa', length: 16, prefixRanges: [[4, 4]], groups: [4, 4, 4, 4] },
  mastercard: {
    label: 'Mastercard',
    length: 16,
    prefixRanges: [
      [51, 55],
      [2221, 2720],
    ],
    groups: [4, 4, 4, 4],
  },
  amex: {
    label: 'American Express',
    length: 15,
    prefixRanges: [
      [34, 34],
      [37, 37],
    ],
    groups: [4, 6, 5],
  },
  discover: {
    label: 'Discover',
    length: 16,
    prefixRanges: [
      [6011, 6011],
      [644, 649],
      [65, 65],
    ],
    groups: [4, 4, 4, 4],
  },
  jcb: { label: 'JCB', length: 16, prefixRanges: [[3528, 3589]], groups: [4, 4, 4, 4] },
  diners: {
    label: 'Diners Club',
    length: 14,
    prefixRanges: [
      [300, 305],
      [36, 36],
      [38, 39],
    ],
    groups: [4, 6, 4],
  },
  unionpay: { label: 'UnionPay', length: 16, prefixRanges: [[620, 620]], groups: [4, 4, 4, 4] },
} as const;

export type PaymentCardNetwork = keyof typeof paymentCardNetworks;

export function isPaymentCardNetwork(value: unknown): value is PaymentCardNetwork {
  return (
    typeof value === 'string' && Object.prototype.hasOwnProperty.call(paymentCardNetworks, value)
  );
}
