<template>
  <q-dialog ref="dialogRef">
    <q-card dark>
      <q-card-section>
        <div><q-radio dark v-model="model" :val="'9'" label="9 cyfrowy REGON" /></div>
        <div><q-radio dark v-model="model" :val="'14'" label="14 cyfrowy REGON" /></div>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn color="primary" @click="onSubmit">Zapisz</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

const { dialogRef, onDialogOK } = useDialogPluginComponent();
const props = defineProps<{ initialValue: '9' | '14' }>();

const model = ref<'9' | '14'>(props.initialValue);

function onSubmit() {
  onDialogOK(model.value);
}
</script>
