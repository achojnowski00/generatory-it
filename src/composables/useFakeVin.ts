import { ref } from 'vue';

export function useFakeVin() {
  function generateVIN() {
    const allowedChars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'; // bez I, O, Q
    const transliteration = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      R: 9,
      S: 2,
      T: 3,
      U: 4,
      V: 5,
      W: 6,
      X: 7,
      Y: 8,
      Z: 9,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '0': 0,
    };

    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    function getRandomChar(): string {
      return allowedChars[Math.floor(Math.random() * allowedChars.length)] as string;
    }

    const vinArray: string[] = [];
    for (let i = 0; i < 17; i++) {
      vinArray.push(getRandomChar());
    }

    // Oblicz sumę kontrolną dla pozycji 9
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const char = vinArray[i] as string;
      const value = transliteration[char as keyof typeof transliteration];
      const weight = weights[i];
      sum += value * (weight as number);
    }

    const remainder = sum % 11;
    const checkDigit = remainder === 10 ? 'X' : remainder.toString();

    vinArray[8] = checkDigit; // pozycja 9

    return vinArray.join('');
  }

  const vin = ref<string>(generateVIN());

  function refreshVin() {
    vin.value = generateVIN();
  }

  return {
    vin,
    generateVIN,
    refreshVin,
  };
}
