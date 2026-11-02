import { ref } from 'vue';

export function useFakeMdowod() {
  function generateMdowod() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const series = Array.from({ length: 3 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length)),
    ).join('');
    const numberPart = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');

    // mDowód: cztery wielkie litery (pierwsza M) i pięć cyfr.
    return `M${series}${numberPart}`;
  }

  const mdowod = ref<string>(generateMdowod());

  function refreshMdowod() {
    mdowod.value = generateMdowod();
  }

  return {
    mdowod,
    generateMdowod,
    refreshMdowod,
  };
}
