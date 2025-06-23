import { ref } from 'vue';

export function useFakeNip() {
  function generateNIP() {
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    while (true) {
      // Wygeneruj 9 cyfr
      const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

      // Oblicz sumę kontrolną
      const sum = digits.reduce((acc, digit, idx) => acc + digit * (weights[idx] as number), 0);
      const controlDigit = sum % 11;

      // 10 jako kontrolna jest niedozwolona — trzeba wygenerować inny zestaw
      if (controlDigit === 10) continue;

      digits.push(controlDigit);
      return digits.join('');
    }
  }

  const nip = ref<string>(generateNIP());

  function refreshNip() {
    nip.value = generateNIP();
  }

  return {
    nip,
    generateNIP,
    refreshNip,
  };
}
