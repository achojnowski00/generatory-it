import { Cookies } from 'quasar';
import { ref, watch } from 'vue';

export interface PeselSettings {
  gender?: 'F' | 'M';
  birthDate?: string;
}

export function isValidPeselBirthDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const date = new Date(year, month - 1, day);
  return (
    year >= 1800 &&
    year <= 2299 &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function useFakePesel() {
  function getCookie(): PeselSettings {
    let saved: unknown = Cookies.get('GENERATORY_PESEL_SETTINGS');
    if (typeof saved === 'string') {
      try {
        saved = JSON.parse(saved);
      } catch {
        return {};
      }
    }
    if (!saved || typeof saved !== 'object') return {};
    const value = saved as Record<string, unknown>;
    const settings: PeselSettings = {};
    if (value.gender === 'F' || value.gender === 'M') settings.gender = value.gender;
    const birthDate =
      typeof value.birthDate === 'string' ? value.birthDate.slice(0, 10).replaceAll('/', '-') : '';
    if (isValidPeselBirthDate(birthDate)) settings.birthDate = birthDate;
    return settings;
  }
  const settings = ref<PeselSettings>(getCookie());

  function generatePESEL() {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    // Ustaw datę urodzenia (jeśli brak — losowa)
    const birthDate = settings.value?.birthDate
      ? new Date(`${settings.value.birthDate}T00:00:00`)
      : randomDate(new Date(1940, 0, 1), new Date(2020, 11, 31));
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    // Zakoduj wiek do miesiąca (dla różnych stuleci)
    const yearStr = year.toString().slice(-2);
    const century = Math.floor(year / 100);
    let encodedMonth;

    switch (century) {
      case 18:
        encodedMonth = month + 80;
        break;
      case 19:
        encodedMonth = month;
        break;
      case 20:
        encodedMonth = month + 20;
        break;
      case 21:
        encodedMonth = month + 40;
        break;
      case 22:
        encodedMonth = month + 60;
        break;
      default:
        throw new Error('Rok spoza zakresu PESEL');
    }

    const MM = encodedMonth.toString().padStart(2, '0');
    const DD = day.toString().padStart(2, '0');

    // Losowe 4 cyfry serii + płeć
    const ZZZ = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    let genderDigit;
    if (settings.value?.gender === 'M') {
      genderDigit = (Math.floor(Math.random() * 5) * 2 + 1).toString(); // nieparzysta
    } else if (settings.value?.gender === 'F') {
      genderDigit = (Math.floor(Math.random() * 5) * 2).toString(); // parzysta
    } else {
      genderDigit = Math.floor(Math.random() * 10).toString();
    }

    const peselWithoutControl = yearStr + MM + DD + ZZZ + genderDigit;

    // Oblicz cyfrę kontrolną
    const sum = peselWithoutControl
      .split('')
      .map((digit, i) => parseInt(digit) * (weights[i] as number))
      .reduce((a, b) => a + b, 0);

    const control = (10 - (sum % 10)) % 10;

    return peselWithoutControl + control;
  }

  function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  const pesel = ref<string>(generatePESEL());

  function setCookie() {
    return Cookies.set('GENERATORY_PESEL_SETTINGS', JSON.stringify(settings.value));
  }

  function refreshPesel() {
    pesel.value = generatePESEL();
  }

  watch(
    () => settings.value,
    () => {
      setCookie();
      refreshPesel();
    },
    { deep: true },
  );

  return {
    pesel,
    settings,
    refreshPesel,
    generatePESEL,
  };
}
