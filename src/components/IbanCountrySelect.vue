<template>
  <q-btn
    flat
    dense
    no-caps
    class="control-pill country-toggle"
    :label="modelValue"
    icon-right="expand_more"
    :aria-label="`Zmień kraj IBAN: ${modelValue}`"
  >
    <q-menu class="country-menu" :offset="[0, 6]" @before-show="query = ''">
      <div class="country-menu__search">
        <q-input
          v-model="query"
          dense
          filled
          autofocus
          clearable
          placeholder="Szukaj kraju"
          aria-label="Szukaj kraju IBAN"
        />
      </div>
      <q-list class="country-menu__list" role="listbox" aria-label="Kraje IBAN">
        <q-item
          v-for="country in filteredCountries"
          :key="country.code"
          v-close-popup
          clickable
          role="option"
          :aria-selected="country.code === modelValue"
          :active="country.code === modelValue"
          active-class="country-option--selected"
          @click="$emit('update:modelValue', country.code)"
        >
          <q-item-section>{{ country.name }}</q-item-section>
          <q-item-section side class="country-code">{{ country.code }}</q-item-section>
        </q-item>
        <q-item v-if="!filteredCountries.length"
          ><q-item-section>Brak wyników</q-item-section></q-item
        >
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ibanCountries } from 'src/data/ibanCountries';
import type { IbanCountryCode } from 'src/data/ibanCountries';

defineProps<{ modelValue: IbanCountryCode }>();
defineEmits<{ (event: 'update:modelValue', value: IbanCountryCode): void }>();
const query = ref('');
const countries = (Object.keys(ibanCountries) as IbanCountryCode[])
  .map((code) => ({ code, name: ibanCountries[code].name }))
  .sort((a, b) => a.name.localeCompare(b.name, 'pl'));

function normalize(value: string) {
  return value
    .toLocaleLowerCase('pl')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll('ł', 'l');
}

const filteredCountries = computed(() => {
  const filter = normalize((query.value ?? '').trim());
  return countries.filter((country) =>
    normalize(`${country.name} ${country.code}`).includes(filter),
  );
});
</script>
