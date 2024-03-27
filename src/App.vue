<template>
  <div class="flex flex-col items-center min-w-[300px]">
    <Header />
    <VehicleForm />
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';

  import { type IStaticMethods } from 'preline/preline';
  import Header from './components/Header.vue';
  import VehicleForm from './components/VehicleForm.vue';

  declare global {
    interface Window {
      HSStaticMethods: IStaticMethods;
    }
  }

  onMounted(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  });
</script>
<style scoped></style>
