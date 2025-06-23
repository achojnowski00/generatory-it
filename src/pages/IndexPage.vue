<template>
  <q-page class="row items-center justify-center">
    <div class="row q-col-gutter-lg" style="width: 100%; max-width: 1024px">
      <div class="col-12 text-white text-center text-subtitle1">Generator fałszywych numerów</div>
      <div class="col-12 col-md-6">
        <NumberContainer :text="vin" label="VIN" @refresh="refreshVin" />
      </div>
      <div class="col-12 col-md-6">
        <NumberContainer :text="nip" label="NIP" @refresh="refreshNip" />
      </div>
      <div class="col-12 col-md-6">
        <NumberContainer
          :text="regon"
          label="REGON"
          show-settings
          @refresh="refreshRegon"
          @settings="openRegonSettingsDialog"
        >
          <template #afterLabel>
            <q-chip color="primary" text-color="white">{{ regonCount }}-cyfrowy</q-chip>
          </template>
        </NumberContainer>
      </div>
      <div class="col-12 col-md-6">
        <NumberContainer
          :text="pesel"
          label="PESEL"
          show-settings
          @refresh="refreshPesel"
          @settings="openPeselSettingsDialog"
        >
          <template #afterLabel>
            <q-chip v-if="peselSettings?.gender" color="primary" text-color="white">
              {{ peselSettings?.gender === 'F' ? 'Kobieta' : 'Mężczyzna' }}
            </q-chip>
            <q-chip
              v-if="peselSettings.birthDate"
              color="primary"
              class="q-ma-none"
              text-color="white"
            >
              {{ peselSettings.birthDate }}
            </q-chip>
          </template>
        </NumberContainer>
      </div>
      <div class="col-12 col-md-6">
        <NumberContainer :text="polishId" label="Numer dowodu" @refresh="refreshPolishId" />
      </div>
      <div class="col-12 col-md-6">
        <NumberContainer :text="plate" label="Numer rejestracyjny" @refresh="refreshPlate" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import NumberContainer from 'src/components/NumberContainer.vue';
import { useFakeNip } from 'src/composables/useFakeNip';
import { useFakePesel } from 'src/composables/useFakePesel';
import { useFakePlates } from 'src/composables/useFakePlates';
import { useFakePolishId } from 'src/composables/useFakePolishId';
import { useFakeRegon } from 'src/composables/useFakeRegon';
import { useFakeVin } from 'src/composables/useFakeVin';

const { vin, refreshVin } = useFakeVin();
const { nip, refreshNip } = useFakeNip();
const {
  regon,
  refreshRegon,
  openSettingsDialog: openRegonSettingsDialog,
  regonCount,
} = useFakeRegon();
const {
  pesel,
  refreshPesel,
  openSettingsDialog: openPeselSettingsDialog,
  settings: peselSettings,
} = useFakePesel();
const { polishId, refreshPolishId } = useFakePolishId();
const { plate, refreshPlate } = useFakePlates();
</script>
