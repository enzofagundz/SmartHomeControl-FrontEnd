<script setup lang="ts"></script>
<template>
  <section>
    <div>
      <img src="../assets/images/home.png" alt="Home illustration" />
    </div>
    <div>
      <h1>
        Connectify
      </h1>
      <p>
        Conecte, controle e gerencie seus dispositivos IoT de forma fácil
      </p>
    </div>
    <div>
      <router-link
        :to="{ name: 'login' }"
        class="btn btn-primary btn-wide"
      >
        Começar
      </router-link>
    </div>
  </section>
</template>
<style scoped>
  div {
    @apply max-w-sm mx-auto flex flex-col w-[100vw] items-center px-8 py-4;
  }
  h1 {
    @apply text-4xl font-bold text-center;
  }
  p {
    @apply text-center;
  }
</style>