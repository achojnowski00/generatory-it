<template>
  <q-dialog ref="dialogRef">
    <q-card dark>
      <q-card-section>
        <!-- prettier-ignore -->
        <q-input dark filled v-model="(model.birthDate as any)" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            </q-icon>
          </template>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="model.birthDate" dark first-day-of-week="1" today-btn>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Zamknij" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-input>

        <div><q-radio dark v-model="model.gender" label="Kobieta" val="F" /></div>
        <div><q-radio dark v-model="model.gender" label="Mężczyzna" val="M" /></div>
        <q-btn color="primary" @click="onReset">Resetuj</q-btn>
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
const props = defineProps<{ initialValue: { gender: 'F' | 'M'; birthDate: Date } }>();

const model = ref<{ gender?: 'F' | 'M'; birthDate?: Date }>({ ...props.initialValue });

function onSubmit() {
  onDialogOK(model.value);
}

function onReset() {
  model.value = {};
}
</script>
