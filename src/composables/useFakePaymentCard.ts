import { Cookies } from 'quasar';
import { computed, ref, watch } from 'vue';
import { isPaymentCardNetwork, paymentCardNetworks } from 'src/data/paymentCardNetworks';
import type { PaymentCardNetwork } from 'src/data/paymentCardNetworks';
import { formatPaymentCard, generatePaymentCard } from 'src/utils/paymentCard';

export function useFakePaymentCard() {
  const savedNetwork: unknown = Cookies.get('GENERATORY_CARD_NETWORK');
  const cardNetwork = ref<PaymentCardNetwork>(
    isPaymentCardNetwork(savedNetwork) ? savedNetwork : 'visa',
  );
  const paymentCard = ref(generatePaymentCard(cardNetwork.value));
  const formattedPaymentCard = computed(() =>
    formatPaymentCard(paymentCard.value, cardNetwork.value),
  );
  const cardLength = computed(() => paymentCardNetworks[cardNetwork.value].length);

  function refreshPaymentCard() {
    paymentCard.value = generatePaymentCard(cardNetwork.value);
  }

  watch(cardNetwork, () => {
    Cookies.set('GENERATORY_CARD_NETWORK', cardNetwork.value);
    refreshPaymentCard();
  });

  return { paymentCard, formattedPaymentCard, cardNetwork, cardLength, refreshPaymentCard };
}
