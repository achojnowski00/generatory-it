<template>
  <article
    class="number-card"
    :aria-label="label"
    :class="{ 'number-card--long': text.length > 20 }"
  >
    <div class="number-card__header">
      <div class="number-card__heading">
        <h3 class="number-card__label">{{ label }}</h3>
        <slot name="afterLabel" />
      </div>
      <div class="number-card__actions">
        <q-btn
          flat
          round
          dense
          icon="refresh"
          class="icon-button"
          :aria-label="`Wygeneruj ponownie: ${label}`"
          @click="$emit('refresh')"
        >
          <q-tooltip>Wygeneruj ponownie</q-tooltip>
        </q-btn>
      </div>
    </div>
    <button
      type="button"
      class="number-card__copy"
      :aria-label="`Kopiuj: ${label}`"
      @click="onClickCopy"
    >
      <span class="number-card__value">{{ displayText || text }}</span>
      <q-icon name="content_copy" class="number-card__copy-icon" aria-hidden="true" />
    </button>
    <div v-if="$slots.details" class="number-card__footer">
      <slot name="details" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { copyToClipboard, Notify } from 'quasar';

const props = defineProps<{
  text: string;
  label: string;
  displayText?: string;
}>();
defineEmits<{ (e: 'refresh'): void }>();

async function onClickCopy() {
  try {
    await copyToClipboard(props.text);
    Notify.create({
      message: `${props.label}: skopiowano`,
      icon: 'check',
      color: 'primary',
      timeout: 1400,
    });
  } catch {
    Notify.create({ message: 'Nie udało się skopiować numeru.', color: 'negative', timeout: 2500 });
  }
}
</script>
