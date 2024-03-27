<template>
  <form
    @submit.prevent="handleFormSubmit"
    class="w-full flex flex-col gap-5 py-5 px-8"
  >
    <div class="flex flex-col gap-3">
      <CustomInput
        id="name"
        v-model="name"
        :required="true"
        type="text"
        label="Nombre del Vehículo"
        placeholder="Ej. CRV de mi mamá"
      />
      <CustomInput
        id="plate"
        v-model="plate"
        :required="true"
        type="text"
        label="Número de Placa"
        placeholder="Placa"
      />
      <CustomInput
        id="serial"
        v-model="serialNumber"
        :required="true"
        type="text"
        label="Número de Serie"
        placeholder="Serie"
      />
      <CustomInput
        id="motor"
        v-model="motorNumber"
        :required="true"
        type="text"
        label="Número de Motor"
        placeholder="Motor"
      />
      <CustomInput
        id="owner"
        v-model="ownerName"
        :required="true"
        type="text"
        label="Nombre del Propietario"
        placeholder="Nombre, primer y segundo apellido"
      />
    </div>
    <button
      type="submit"
      class="w-full py-3 px-4 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Guardar Vehículo
    </button>
  </form>
</template>

<script setup lang="ts">
  import { type Ref, onMounted, ref } from 'vue';
  import CustomInput from './CustomInput.vue';
  import type Vehicle from '@/types/Vehicle';

  const name = ref();
  const plate = ref();
  const serialNumber = ref();
  const motorNumber = ref();
  const ownerName = ref();
  const vehicles: Ref<Vehicle[]> = ref([]);

  onMounted(async () => {
    chrome.storage.sync.get(['avj-data'], (result: any) => {
      if (Object.keys(result).length === 0) {
        chrome.storage.sync.set({ 'avj-data': [] }, () => {});
      } else {
        vehicles.value = Object.values(result['avj-data']);
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes['avj-data']?.newValue) {
        const newData = changes['avj-data']?.newValue;
        vehicles.value = Object.values(newData);
      }
    });
  });

  const resetForm = () => {
    name.value = '';
    plate.value = '';
    serialNumber.value = '';
    motorNumber.value = '';
    ownerName.value = '';
  };

  const handleFormSubmit = (e: Event) => {
    const vehicle = <Vehicle>{
      name: name.value,
      plate: plate.value,
      serialNumber: serialNumber.value,
      motorNumber: motorNumber.value,
      ownerName: ownerName.value,
    };

    vehicles.value.push(vehicle);
    chrome.storage.sync.set({ 'avj-data': vehicles.value }, () => {});
    resetForm();
  };
</script>

<style scoped></style>
