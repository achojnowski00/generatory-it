import { ref } from 'vue';
import { generateIban } from 'src/utils/iban';

export function useFakeBankAccount() {
  function generateBankAccount() {
    return generateIban('PL').slice(2);
  }

  const bankAccount = ref<string>(generateBankAccount());

  function refreshBankAccount() {
    bankAccount.value = generateBankAccount();
  }

  return {
    bankAccount,
    generateBankAccount,
    refreshBankAccount,
  };
}
