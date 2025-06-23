import { ref } from 'vue';

export function useFakePolishId() {
  function generatePolishID() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const weights = [7, 3, 1, 7, 3, 1, 7, 3, 1];

    // Wygeneruj 3 losowe litery (seria)
    const series = Array.from(
      { length: 3 },
      () => letters[Math.floor(Math.random() * letters.length)],
    );

    // Wygeneruj 5 cyfr (pomijamy cyfrę kontrolną na razie)
    const numberPart = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));

    // Pozycje 0-2: litery → zamiana A=10, B=11, ..., Z=35
    let fullArray = series.map((l) => (l as string).charCodeAt(0) - 55); // A=65 → 10

    // Dodaj cyfrę kontrolną tymczasowo jako 0, by zająć miejsce
    fullArray.push(0);

    // Dodaj kolejne cyfry z numberPart
    fullArray = fullArray.concat(numberPart);

    // Oblicz sumę kontrolną (cyfr kontrolnych)
    const sum = fullArray
      .map((val, idx) => val * (weights[idx] as number))
      .reduce((a, b) => a + b, 0);

    const controlDigit = sum % 10;

    // Wstaw cyfrę kontrolną na pozycję 4 (czyli index 3)
    const idNumber = [...series, controlDigit.toString(), ...numberPart].join('');

    return idNumber;
  }

  const polishId = ref<string>(generatePolishID());

  function refreshPolishId() {
    polishId.value = generatePolishID();
  }

  return {
    polishId,
    generatePolishID,
    refreshPolishId,
  };
}
