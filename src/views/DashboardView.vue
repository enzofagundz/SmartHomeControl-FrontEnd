<script setup lang="ts">
import checkTuyaContext from '@/utils/checkTuyaContext';
const API = import.meta.env.VITE_API_URL;
const email: string | null = sessionStorage.getItem('email');
checkTuyaContext(API, email);
</script>

<template>
  <NavbarComponent />
  <div>
    <h1>
      DashboardView.vue
    </h1>
  </div>
</template>

<style scoped></style>