import { paymentCardNetworks } from '../data/paymentCardNetworks';
import type { PaymentCardNetwork } from '../data/paymentCardNetworks';

export function calculateLuhnCheckDigit(numberWithoutCheckDigit: string): string {
  let sum = 0;
  let doubleDigit = true;

  for (const character of [...numberWithoutCheckDigit].reverse()) {
    let digit = Number(character);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return String((10 - (sum % 10)) % 10);
}

export function generatePaymentCard(network: PaymentCardNetwork): string {
  const definition = paymentCardNetworks[network];
  const [minimum, maximum] =
    definition.prefixRanges[Math.floor(Math.random() * definition.prefixRanges.length)] ??
    definition.prefixRanges[0];
  const prefix = String(minimum + Math.floor(Math.random() * (maximum - minimum + 1)));
  const body =
    prefix +
    Array.from({ length: definition.length - prefix.length - 1 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

  return body + calculateLuhnCheckDigit(body);
}

export function formatPaymentCard(number: string, network: PaymentCardNetwork): string {
  let offset = 0;
  return paymentCardNetworks[network].groups
    .map((length) => {
      const group = number.slice(offset, offset + length);
      offset += length;
      return group;
    })
    .join(' ');
}
