import { Cookies } from 'quasar';
import { computed, ref, watch } from 'vue';
import { ibanCountries, isIbanCountryCode } from 'src/data/ibanCountries';
import type { IbanCountryCode } from 'src/data/ibanCountries';
import { generateIban } from 'src/utils/iban';

export function useFakeIban() {
  const savedCountry: unknown = Cookies.get('GENERATORY_IBAN_COUNTRY');
  const ibanCountry = ref<IbanCountryCode>(isIbanCountryCode(savedCountry) ? savedCountry : 'PL');
  const ibanLength = computed(() => ibanCountries[ibanCountry.value].length);
  const iban = ref<string>(generateIban(ibanCountry.value));

  function refreshIban() {
    iban.value = generateIban(ibanCountry.value);
  }

  watch(ibanCountry, () => {
    Cookies.set('GENERATORY_IBAN_COUNTRY', ibanCountry.value);
    refreshIban();
  });

  return {
    iban,
    ibanCountry,
    ibanLength,
    refreshIban,
  };
}
