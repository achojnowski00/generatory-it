import { ibanCountries } from '../data/ibanCountries';
import type { IbanCountryCode } from '../data/ibanCountries';

export function calculateIbanCheckDigits(countryCode: string, bban: string): string {
  let remainder = 0;

  // Litery zamieniamy na A=10, ..., Z=35. Liczenie cyfra po cyfrze chroni precyzję Number.
  for (const character of `${bban}${countryCode}00`) {
    const digits = /[A-Z]/.test(character) ? String(character.charCodeAt(0) - 55) : character;

    for (const digit of digits) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }

  return String(98 - remainder).padStart(2, '0');
}

export function generateIban(countryCode: IbanCountryCode): string {
  const pattern = ibanCountries[countryCode].bbanPattern;
  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomBban = [...pattern.matchAll(/(\d+)!([nac])/g)]
    .map(([, length, type]) => {
      const alphabet = type === 'n' ? numbers : type === 'a' ? letters : letters + numbers;

      return Array.from({ length: Number(length) }, () =>
        alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
      ).join('');
    })
    .join('');
  // Zachowujemy prawidłowy numer rozliczeniowy używany przez generator polskiego NRB.
  const bban = countryCode === 'PL' ? '16000003' + randomBban.slice(8) : randomBban;

  return countryCode + calculateIbanCheckDigits(countryCode, bban) + bban;
}
