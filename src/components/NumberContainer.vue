<template>
  <div class="bg-grey rounded-borders q-px-md q-py-sm">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <q-chip class="q-ma-none text-weight-medium">{{ label }}</q-chip>
        <slot name="afterLabel" />
      </div>
      <div class="row q-col-gutter-sm">
        <div v-if="showSettings">
          <q-btn
            @click="$emit('settings')"
            icon="settings"
            color="white"
            text-color="black"
            style="z-index: 10"
          />
        </div>
        <div>
          <q-btn
            @click="$emit('refresh')"
            icon="loop"
            color="white"
            text-color="black"
            style="z-index: 10"
          />
        </div>
      </div>
    </div>
    <q-item
      clickable
      dense
      @click="onClickCopy"
      style="margin-left: -8px; margin-right: -8px"
      class="q-mt-sm q-px-sm"
    >
      <q-item-section style="font-size: 24px">
        {{ text }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard, Notify } from 'quasar';

const props = defineProps<{ text: string; label: string; showSettings?: boolean }>();
defineEmits<{ (e: 'refresh'): void; (e: 'settings'): void }>();

async function onClickCopy() {
  await copyToClipboard(props.text);
  Notify.create({ message: 'Skopiowano do schowka' });
}
</script>
