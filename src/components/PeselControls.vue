<template>
  <div class="pesel-controls">
    <q-btn
      flat
      dense
      no-caps
      class="control-pill"
      :label="genderLabel"
      icon-right="expand_more"
      aria-label="Płeć dla numeru PESEL"
    >
      <q-menu auto-close :offset="[0, 6]">
        <q-list class="gender-menu">
          <q-item
            v-for="option in genderOptions"
            :key="option.value"
            clickable
            :active="(modelValue.gender ?? '') === option.value"
            active-class="country-option--selected"
            @click="setGender(option.value)"
          >
            <q-item-section>{{ option.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn
      flat
      round
      dense
      icon="calendar_today"
      class="icon-button birth-date-button"
      :class="{ 'birth-date-button--selected': modelValue.birthDate }"
      aria-label="Data urodzenia dla numeru PESEL"
    >
      <q-menu v-model="dateMenuOpen" class="birth-date-menu" :offset="[0, 6]">
        <label for="pesel-birth-date">Data urodzenia</label>
        <input
          id="pesel-birth-date"
          type="date"
          :value="modelValue.birthDate ?? ''"
          min="1800-01-01"
          max="2299-12-31"
          @change="setBirthDate"
        />
        <q-btn flat dense no-caps class="date-reset" label="Losowa data" @click="clearBirthDate" />
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { isValidPeselBirthDate } from 'src/composables/useFakePesel';
import type { PeselSettings } from 'src/composables/useFakePesel';

const props = defineProps<{ modelValue: PeselSettings }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: PeselSettings): void }>();
const dateMenuOpen = ref(false);
const genderOptions = [
  { label: 'Losowo', value: '' },
  { label: 'Kobieta', value: 'F' },
  { label: 'Mężczyzna', value: 'M' },
] as const;
const genderLabel = computed(() =>
  props.modelValue.gender === 'F'
    ? 'Kobieta'
    : props.modelValue.gender === 'M'
      ? 'Mężczyzna'
      : 'Płeć',
);

function setGender(value: 'F' | 'M' | '') {
  const settings = { ...props.modelValue };
  if (value) settings.gender = value;
  else delete settings.gender;
  emit('update:modelValue', settings);
}

function setBirthDate(event: Event) {
  const input = event.currentTarget as HTMLInputElement;
  if (!input.validity.valid || (input.value && !isValidPeselBirthDate(input.value))) return;
  const settings = { ...props.modelValue };
  if (input.value) settings.birthDate = input.value;
  else delete settings.birthDate;
  emit('update:modelValue', settings);
  dateMenuOpen.value = false;
}

function clearBirthDate() {
  const settings = { ...props.modelValue };
  delete settings.birthDate;
  emit('update:modelValue', settings);
  dateMenuOpen.value = false;
}
</script>
