import { Cookies, Dialog } from 'quasar';
import RegonSettingsModal from 'src/components/RegonSettingsModal.vue';
import { ref, watch } from 'vue';

export function useFakeRegon() {
  function generateREGON9() {
    const weights = [8, 9, 2, 3, 4, 5, 6, 7];
    const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    const sum = digits.reduce((acc, digit, idx) => acc + digit * (weights[idx] as number), 0);
    let controlDigit = sum % 11;
    if (controlDigit === 10) controlDigit = 0;
    digits.push(controlDigit);
    return digits.join('');
  }

  function generateREGON14() {
    const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];
    const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    const sum9 = base.reduce((acc, digit, idx) => acc + digit * (weights9[idx] as number), 0);
    let control9 = sum9 % 11;
    if (control9 === 10) control9 = 0;
    base.push(control9);
    const extension = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    const regon13 = base.concat(extension);
    const sum14 = regon13.reduce((acc, digit, idx) => acc + digit * (weights14[idx] as number), 0);
    let control14 = sum14 % 11;
    if (control14 === 10) control14 = 0;
    regon13.push(control14);
    return regon13.join('');
  }

  const regonCount = ref<'9' | '14'>(getCookie() === '14' ? '14' : '9');
  function generateRegon() {
    if (regonCount.value === '14') return generateREGON14();

    return generateREGON9();
  }

  function refreshRegon() {
    regon.value = generateRegon();
  }

  const regon = ref<string>(generateRegon());

  function getCookie() {
    return Cookies.get('GENERATORY_REGON_COUNT');
  }
  function setCookie() {
    return Cookies.set('GENERATORY_REGON_COUNT', regonCount.value);
  }

  watch(
    () => regonCount.value,
    () => {
      setCookie();
      refreshRegon();
    },
  );

  function openSettingsDialog() {
    Dialog.create({
      component: RegonSettingsModal,
      componentProps: {
        initialValue: regonCount.value,
      },
    }).onOk((v) => {
      regonCount.value = v;
    });
  }

  return {
    regon,
    regonCount,
    generateREGON9,
    refreshRegon,
    openSettingsDialog,
  };
}
