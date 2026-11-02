<template>
  <q-page class="workspace">
    <header class="workspace-header">
      <h1>Generatory<span>IT</span></h1>
      <q-btn
        unelevated
        no-caps
        class="generate-all"
        icon="refresh"
        label="Odśwież wszystko"
        @click="reloadAll"
      />
    </header>
    <div class="workspace-columns">
      <section id="tozsamosc" class="generator-section" aria-labelledby="identity-title">
        <div class="section-heading">
          <h2 id="identity-title">Tożsamość</h2>
          <span class="section-heading__rule" />
        </div>
        <div class="generator-grid generator-grid--three">
          <NumberContainer :text="pesel" label="PESEL" @refresh="refreshPesel">
            <template #afterLabel><PeselControls v-model="peselSettings" /></template>
            <template v-if="peselSettings?.gender || peselSettings?.birthDate" #details>
              <span v-if="peselSettings?.gender">{{
                peselSettings.gender === 'F' ? 'Kobieta' : 'Mężczyzna'
              }}</span>
              <span v-if="peselSettings?.gender && peselSettings?.birthDate"> · </span>
              <span v-if="peselSettings?.birthDate">{{ peselSettings.birthDate }}</span>
            </template>
          </NumberContainer>
          <NumberContainer :text="polishId" label="Dowód osobisty" @refresh="refreshPolishId" />
          <NumberContainer :text="mdowod" label="mDowód" @refresh="refreshMdowod" />
        </div>
      </section>

      <section id="firma" class="generator-section" aria-labelledby="company-title">
        <div class="section-heading">
          <h2 id="company-title">Firma</h2>
          <span class="section-heading__rule" />
        </div>
        <div class="generator-grid generator-grid--two">
          <NumberContainer :text="nip" label="NIP" @refresh="refreshNip" />
          <NumberContainer :text="regon" label="REGON" @refresh="refreshRegon">
            <template #afterLabel>
              <q-btn
                flat
                dense
                no-caps
                class="control-pill"
                :label="`${regonCount} cyfr`"
                icon-right="swap_horiz"
                :aria-label="`REGON: ${regonCount} cyfr. Przełącz na ${regonCount === '9' ? '14' : '9'} cyfr`"
                @click="toggleRegonCount"
              >
                <q-tooltip>Zmień na {{ regonCount === '9' ? '14' : '9' }} cyfr</q-tooltip>
              </q-btn>
            </template>
          </NumberContainer>
        </div>
      </section>

      <section id="finanse" class="generator-section" aria-labelledby="finance-title">
        <div class="section-heading">
          <h2 id="finance-title">Finanse</h2>
          <span class="section-heading__rule" />
        </div>
        <div class="generator-grid generator-grid--three">
          <NumberContainer
            :text="bankAccount"
            :display-text="formattedBankAccount"
            label="Rachunek (NRB)"
            @refresh="refreshBankAccount"
          />
          <NumberContainer
            :text="iban"
            :display-text="formattedIban"
            label="IBAN"
            @refresh="refreshIban"
          >
            <template #afterLabel><IbanCountrySelect v-model="ibanCountry" /></template>
          </NumberContainer>
          <NumberContainer
            :text="paymentCard"
            :display-text="formattedPaymentCard"
            label="Karta płatnicza"
            @refresh="refreshPaymentCard"
          >
            <template #afterLabel>
              <select
                v-model="cardNetwork"
                class="network-select"
                aria-label="Sieć karty płatniczej"
              >
                <option v-for="(network, code) in paymentCardNetworks" :key="code" :value="code">
                  {{ network.label }}
                </option>
              </select>
            </template>
          </NumberContainer>
        </div>
      </section>

      <section id="pojazdy" class="generator-section" aria-labelledby="vehicles-title">
        <div class="section-heading">
          <h2 id="vehicles-title">Pojazdy</h2>
          <span class="section-heading__rule" />
        </div>
        <div class="generator-grid generator-grid--two">
          <NumberContainer :text="vin" label="VIN" @refresh="refreshVin" />
          <NumberContainer :text="plate" label="Numer rejestracyjny" @refresh="refreshPlate" />
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NumberContainer from 'src/components/NumberContainer.vue';
import IbanCountrySelect from 'src/components/IbanCountrySelect.vue';
import PeselControls from 'src/components/PeselControls.vue';
import { useFakeBankAccount } from 'src/composables/useFakeBankAccount';
import { useFakeIban } from 'src/composables/useFakeIban';
import { useFakeMdowod } from 'src/composables/useFakeMdowod';
import { useFakeNip } from 'src/composables/useFakeNip';
import { useFakePaymentCard } from 'src/composables/useFakePaymentCard';
import { useFakePesel } from 'src/composables/useFakePesel';
import { useFakePlates } from 'src/composables/useFakePlates';
import { useFakePolishId } from 'src/composables/useFakePolishId';
import { useFakeRegon } from 'src/composables/useFakeRegon';
import { useFakeVin } from 'src/composables/useFakeVin';
import { paymentCardNetworks } from 'src/data/paymentCardNetworks';

const { vin, refreshVin } = useFakeVin();
const { nip, refreshNip } = useFakeNip();
const { regon, refreshRegon, toggleRegonCount, regonCount } = useFakeRegon();
const { pesel, refreshPesel, settings: peselSettings } = useFakePesel();
const { polishId, refreshPolishId } = useFakePolishId();
const { mdowod, refreshMdowod } = useFakeMdowod();
const { bankAccount, refreshBankAccount } = useFakeBankAccount();
const { iban, ibanCountry, refreshIban } = useFakeIban();
const { paymentCard, formattedPaymentCard, cardNetwork, refreshPaymentCard } = useFakePaymentCard();
const { plate, refreshPlate } = useFakePlates();

const formattedIban = computed(() => iban.value.match(/.{1,4}/g)?.join(' ') ?? iban.value);
const formattedBankAccount = computed(
  () =>
    `${bankAccount.value.slice(0, 2)} ${
      bankAccount.value
        .slice(2)
        .match(/.{1,4}/g)
        ?.join(' ') ?? ''
    }`,
);

function reloadAll() {
  refreshVin();
  refreshNip();
  refreshRegon();
  refreshPesel();
  refreshPolishId();
  refreshMdowod();
  refreshBankAccount();
  refreshIban();
  refreshPaymentCard();
  refreshPlate();
}
</script>
